import GetCharacterInventoryRequest = PlayFabServerModels.GetCharacterInventoryRequest;
import ItemInstance = PlayFabServerModels.ItemInstance;

class CellService
{
    GetCellInformation(characterId : string) : CellInformation
    {
        const charData = CellService.GetCharacterData(characterId);
        const items = CellService.GetItemsFromCharacter(characterId);

        log.info("charData", charData);
        log.info("items", items);
        // GetCharacterData
        // get inventory

        // get list of resources
        // get number of organelles that are plastid

        // calculate the min amount for success = 1 + plastidsNumber
        // calculate success rate = 0.5 /plastidsNumber

        return {
            Items: null,
            MinAmountForSuccess: 666,
            SuccessRate: 0.5,
            CharacterName: "Hello World!!!!"
        };
    }

    static GetSuccessRates(plastidNumbers : number) : object
    {
        return {
            MinAmountForSuccess: 1,
            SuccessRate: 0.5
        };
    }

    private static GetItemsFromCharacter(characterId : string) : ItemInstance[]
    {
        let itemsRequest : GetCharacterInventoryRequest = {CharacterId: characterId, PlayFabId: currentPlayerId};
        let itemsResponse = server.GetCharacterInventory(itemsRequest);

        return itemsResponse.Inventory;
    }

    private static GetCharacterData(characterId : string)
    {
        const request = {CharacterId: characterId, PlayFabId: currentPlayerId};
        return server.GetCharacterData(request);
    }
}

export default CellService;