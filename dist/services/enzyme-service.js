import ServiceLocator from "../utils/service-locator";
import CharacterInventoryService from "./character-inventory-service";
import GeneratorService from "./generator-service";
class EnzymeService {
    Purchase(enzymeId, costs, organelleItemInstanceId) {
        const invService = ServiceLocator.resolve(CharacterInventoryService);
        invService.ConsumeItems(costs);
        // create the enzyme and update custom data
        const enzyme = invService.GrantItems([enzymeId]);
        const enzymeInstanceId = enzyme.ItemGrantResults[0].ItemInstanceId;
        invService.UpdateItemCustomData(enzymeInstanceId, { organelleItemInstanceId });
        // update custom data from organelle
        const organelle = invService.GetLocalInventoryItem(organelleItemInstanceId);
        const enzymeCreatedString = organelle.CustomData["enzymesCreated"] || "0";
        const enzymesCreated = parseInt(enzymeCreatedString) + 1;
        invService.UpdateItemCustomData(organelleItemInstanceId, { enzymesCreated: enzymesCreated.toString() });
    }
    Equip(enzymeItemInstanceId, organelleItemInstanceId) {
        const invService = ServiceLocator.resolve(CharacterInventoryService);
        invService.UpdateItemCustomData(enzymeItemInstanceId, { organelleItemInstanceId });
        const genService = ServiceLocator.resolve(GeneratorService);
        genService.Create(enzymeItemInstanceId);
    }
    UnEquip(enzymeItemInstanceId) {
        const invService = ServiceLocator.resolve(CharacterInventoryService);
        invService.UpdateItemCustomData(enzymeItemInstanceId, { organelleItemInstanceId: "" });
        const genService = ServiceLocator.resolve(GeneratorService);
        genService.Destroy(enzymeItemInstanceId);
    }
}
export default EnzymeService;