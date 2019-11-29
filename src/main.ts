import CharacterService from "./services/character-service";
import ServiceLocator from "./utils/service-locator";
import CurrencyService from "./services/currency-service";
import CharacterInventoryService from "./services/character-inventory-service";
import OrganelleService from "./services/organelle-service";
import EnzymeService from "./services/enzyme-service";
import TitleDataService from "./services/title-data-service";
import GeneratorService from "./services/generator-service";

class Controller {
    constructor()
    {
        Controller.registerServices();
    }

    CreateCharacter(args: ICreateCharacterController): void
    {
        Controller.setupTitleData();
        const characterService = <CharacterService> ServiceLocator.resolve(CharacterService);
        characterService.Create(args.CharacterName);
    }

    PurchaseOrganelle(args: IPurchaseOrganelleController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const organelleService = <OrganelleService> ServiceLocator.resolve(OrganelleService);
        organelleService.Purchase(args.OrganelleId, args.AtpCost);
    }

    EquipOrganelle(args: IEquipOrganelleController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const organelleService = <OrganelleService> ServiceLocator.resolve(OrganelleService);
        organelleService.Equip(args.OrganelleItemInstanceId, args.PosX.toString(), args.PosY.toString())
    }

    PurchaseEnzyme(args : IPurchaseEnzymeController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const enzymeService = <EnzymeService> ServiceLocator.resolve(EnzymeService);
        enzymeService.Purchase(args.EnzymeId, args.costs, args.OrganelleItemInstanceId);
    }

    EquipEnzyme(args : IEquipEnzymeController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const enzymeService = <EnzymeService> ServiceLocator.resolve(EnzymeService);
        enzymeService.Equip(args.EnzymeItemInstanceId, args.OrganelleItemInstanceId);
    }

    UnEquipEnzyme(args : IUnEquipEnzymeController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const enzymeService = <EnzymeService> ServiceLocator.resolve(EnzymeService);
        enzymeService.UnEquip(args.EnzymeItemInstanceId);
    }

    ClaimGenerator(args : IClaimGeneratorController) : void
    {
        Controller.setupTitleData();
        Controller.setupInventory(args.CharacterId);
        const generatorService = <GeneratorService> ServiceLocator.resolve(GeneratorService);
        generatorService.Claim(args.generatorItemInstanceId);
    }

    private static setupInventory(characterId: string)
    {
        const inventoryService = <CharacterInventoryService>ServiceLocator.resolve(CharacterInventoryService);
        inventoryService.characterId = characterId;
        inventoryService.FetchItems();
    }

    private static setupTitleData()
    {
        const titleDataService = <TitleDataService> ServiceLocator.resolve(TitleDataService);
        titleDataService.FetchData();
    }

    private static registerServices(): void
    {
        ServiceLocator.register(TitleDataService, new TitleDataService());
        ServiceLocator.register(CharacterService, new CharacterService());
        ServiceLocator.register(CurrencyService, new CurrencyService());
        ServiceLocator.register(CharacterInventoryService, new CharacterInventoryService());
        ServiceLocator.register(OrganelleService, new OrganelleService());
        ServiceLocator.register(EnzymeService, new EnzymeService());
        ServiceLocator.register(GeneratorService, new GeneratorService());

    }
}

const controller = new Controller();
handlers["CreateCharacter"] = controller.CreateCharacter;
handlers["PurchaseOrganelle"] = controller.PurchaseOrganelle;
handlers["EquipOrganelle"] = controller.EquipOrganelle;
handlers["PurchaseEnzyme"] = controller.PurchaseEnzyme;
handlers["EquipEnzyme"] = controller.EquipEnzyme;
handlers["UnEquipEnzyme"] = controller.UnEquipEnzyme;
handlers["ClaimGenerator"] = controller.ClaimGenerator;