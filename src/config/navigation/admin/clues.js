import ClueLevelsManager from 'components/admin/clues/levels-manager'
import QrCodesManager from 'components/admin/clues/qr-codes'

const config = {
  route: "clues",
  title: "Indices",
  description: "Accédez à la gestion des indices",
  client: "ClueClient",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        label: "Titre",
        name: "name"
      },
      {
        label: "Jeu",
        name: "scenario.game.title"
      },
      {
        label: "Scenario",
        name: "scenario.name"
      },
      {
        label: "Type",
        name: "family"
      },
      {
        label: "Description",
        name: "description"
      }
    ],
    actions: [
      "new",
      "delete",
      "edit",
      {
        action: "manage_levels",
        label: "Niveaux",
        icon: "medal",
        component: ClueLevelsManager
      },
      {
        action: "manage_qrcodes",
        label: "QR Codes",
        icon: "gleam",
        component: QrCodesManager
      }
    ]
  },
  form: {
    attributes: [
      {
        name: "name",
        label: "Titre",
        placeholder: "Titre de l'indice",
        type: "text",
        required: true
      },
      {
        name: "family",
        label: "Type d'indice",
        type: "select",
        placeholder: false,
        values: [
          {id: "none", title: "Aucun"},
          {id: "budget", title: "Budget"},
          {id: "decision", title: "Moteur de décision"},
          {id: "technique", title: "Contexte technique"},
          {id: "bonus", title: "Bonus"}
        ],
        key: "id",
        value: "title",
        required: true,
        defaultValue: -1
      },
      {
        name: "description",
        label: "Libellé",
        placeholder: "Libellé de l'indice",
        type: "text",
        required: true
      },
      {
        name: "scenario_id",
        label: "Scénario",
        placeholder: "Sélectionnez un scénario",
        type: "select",
        values: {
          targetState: "scenarioState",
          targetValue: "scenarios",
          client: "ScenarioClient",
          func: "fetchAll"
        },
        key: "id",
        value: "name",
        required: true,
        defaultValue: -1
      },
      {
        name: "unblock_rule",
        label: "Règle de déblocage",
        placeholder: "Entrez la règle de déblocage (exemple: 'budget|2;technique:3' pour un déblocage au niveau 2 budget et 3 technique)",
        type: "text",
        displayIf: {
          name: "family",
          value: "bonus"
        }
      }
    ]
  },
  delete: {
    labels: {
      entity: "l'indice",
      identifier: "name"
    }
  }
}

export default config
