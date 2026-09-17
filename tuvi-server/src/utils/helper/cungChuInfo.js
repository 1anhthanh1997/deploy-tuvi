import { viToEnData, enToViData } from "./constants";

function getCungChuInfo(cungChu) {
  switch (enToViData[cungChu]) {
    case "Mệnh": {
      return {
        description: "nature, ideals, core, willpower, personality.",
        shortName: "",
        doiXung: viToEnData["Thiên Di"],
      };
    }
    case "Phụ mẫu": {
      return {
        description:
          "parents, parents-in-law, those who play parental roles, previous generations (past), superiors (bosses, leaders, seniors...).",
        shortName: "Phụ",
        doiXung: viToEnData["Tật Ách"],
      };
    }
    case "Phúc đức": {
      return {
        description:
          "blessings/luck, spiritual values, family clan (paternal/maternal), views on happiness",
        shortName: "Phúc",
        doiXung: viToEnData["Tài Bạch"],
      };
    }
    case "Điền trạch": {
      return {
        description:
          "asset accumulation, infrastructure, daily living habits, material legacy left for the world.",
        shortName: "Điền",
        doiXung: viToEnData["Tử tức"],
      };
    }
    case "Quan lộc": {
      return {
        description: "work/career, work style/capability",
        shortName: "Quan",
        doiXung: viToEnData["Phu thê"],
      };
    }
    case "Nô bộc": {
      return {
        description:
          "peer generation (present), superficial social relationships, relationships that only share benefits without sharing risks.",
        shortName: "Nô",
        doiXung: viToEnData["Huynh đệ"],
      };
    }
    case "Thiên Di": {
      return {
        description: `society's view of the native, external environment of the "Destiny", partners/competitors/counterparts, interpersonal skills & social interaction.`,
        shortName: "Di",
        doiXung: viToEnData["Mệnh"],
      };
    }
    case "Tật Ách": {
      return {
        description: "health, illness, karmic consequences.",
        shortName: "Tật",
        doiXung: viToEnData["Phụ mẫu"],
      };
    }
    case "Tài Bạch": {
      return {
        description:
          "talents/resources/finances, money, economy, material values",
        shortName: "Tài",
        doiXung: viToEnData["Phúc đức"],
      };
    }
    case "Tử tức": {
      return {
        description:
          "future generations (future), children/disciples/students/pets, spiritual legacy left for the world.",
        shortName: "Tử",
        doiXung: viToEnData["Điền trạch"],
      };
    }
    case "Phu thê": {
      return {
        description: "Spouse, lover/partner, close personal relationships",
        shortName: "Phối",
        doiXung: viToEnData["Quan lộc"],
      };
    }
    case "Huynh đệ": {
      return {
        description:
          "siblings in the family clan, relationships sharing both benefits and risks, sworn siblings, close social siblings...",
        shortName: "Bào",
        doiXung: viToEnData["Nô bộc"],
      };
    }
    default: {
      return "";
    }
  }
}

export {
  getCungChuInfo,
};