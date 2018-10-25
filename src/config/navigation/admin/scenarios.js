import Archive from 'components/admin/scenarios/archive'

const config  = {
  route: "scenarios",
  title: "Scenarios",
  description: "Gérez les scénarios accessibles dans les jeux",
  client: "ScenarioClient",
  icon: "news-paper",
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
        name: "game.title"
      },
      {
        label: "QRCode",
        name: "qrcode"
      },
      {
        label: "Description",
        name: "description"
      },
      {
        label: "Déploiement",
        name: "deployment"
      },
      {
        label: "Upload",
        name: "upload"
      },
      {
        label: "Gif",
        name: "gif",
        type: "image"
      }
    ],
    actions: [
      "new",
      "delete",
      "edit",
      {
        action: "upload_archive",
        label: "Upload",
        icon: "upload",
        component: Archive,
        tinify: true
      }
    ]
  },
  form: {
    attributes: [
      {
        name: "name",
        label: "Titre",
        placeholder: "Titre du scenario",
        type: "text",
        required: true
      },
      {
        name: "qrcode",
        label: "QRCode",
        placeholder: "QRCode du scenario",
        type: "text",
        required: true
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Description du scenario",
        type: "text",
        required: true
      },
      {
        name: "game_id",
        label: "Jeu",
        placeholder: "Sélectionnez un jeu",
        type: "select",
        values: {
          targetState: "gameState",
          targetValue: "games",
          client: "GameClient",
          func: "fetchAll"
        },
        key: "id",
        value: "title",
        required: true,
        defaultValue: -1
      },
      {
        name: "chrono",
        label: "Chrono (en minutes)",
        placeholder: "Temps limite du scénario",
        type: "number",
        required: true
      },
      {
        name: "gif",
        label: "Gif",
        placeholder: "indiquez l'url du gif",
        type: "image-uploader"
      }
    ]
  },
  delete: {
    labels: {
      entity: "le scenario",
      identifier: "name"
    }
  }
}

export default config
