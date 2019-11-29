class CharacterInventoryService {
    FetchItems() {
        let itemsRequest = { CharacterId: this.characterId, PlayFabId: currentPlayerId };
        let itemsResponse = server.GetCharacterInventory(itemsRequest);
        this.characterItems = itemsResponse.Inventory;
    }
    GrantItems(itemIds) {
        const itemsGrantRequest = {
            CharacterId: this.characterId,
            ItemIds: itemIds,
            PlayFabId: currentPlayerId
        };
        const itemsGrantResult = server.GrantItemsToCharacter(itemsGrantRequest);
        if (itemsGrantResult.ItemGrantResults !== undefined) {
            itemsGrantResult.ItemGrantResults.forEach(i => this.characterItems.push(i));
        }
        return itemsGrantResult;
    }
    RevokeItem(item) {
        const result = server.RevokeInventoryItem(item);
        const revokedItem = -this.characterItems.findIndex(i => i.ItemInstanceId === item.ItemInstanceId);
        this.characterItems = this.characterItems.splice(revokedItem, 1);
        return result;
    }
    ConsumeItems(items) {
        const consumeItemResults = [];
        for (const key in items) {
            const itemInstanceId = key;
            const amount = items[key];
            const consumeRequest = {
                CharacterId: "",
                ConsumeCount: 0,
                ItemInstanceId: "",
                PlayFabId: ""
            };
            consumeItemResults.push(server.ConsumeItem(consumeRequest));
        }
        consumeItemResults.forEach(c => {
            const localItem = this.characterItems.find(i => i.ItemInstanceId === c.ItemInstanceId);
            localItem.RemainingUses = c.RemainingUses;
        });
        return consumeItemResults;
    }
    UpdateItemCustomData(itemInstanceId, data) {
        const stringifyData = {};
        for (const key in Object.getOwnPropertyNames(data)) {
            stringifyData[key] = data[key];
        }
        let customDataUpdateRequest = {
            CharacterId: this.characterId,
            Data: stringifyData,
            ItemInstanceId: itemInstanceId,
            PlayFabId: currentPlayerId
        };
        server.UpdateUserInventoryItemCustomData(customDataUpdateRequest);
        const updatedItem = this.characterItems.find(i => i.ItemInstanceId === itemInstanceId);
        for (const key in Object.getOwnPropertyNames(data)) {
            updatedItem.CustomData[key] = data[key];
        }
    }
    GetLocalInventoryItem(itemInstanceId) {
        return this.characterItems.find(i => i.ItemInstanceId === itemInstanceId);
    }
    FindItemWithCustomData(itemId, key, value) {
        const itemsOfType = this.characterItems.filter(i => i.ItemId === itemId);
        return itemsOfType.find(i => i[key] === value);
    }
}
export default CharacterInventoryService;