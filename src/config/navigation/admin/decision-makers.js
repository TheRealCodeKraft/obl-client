const config = {
  route: "decision_makers",
  title: "Décideurs",
  description: "Gérez les décideurs qui seront accédés pendant les sessions de jeu",
  client: "DecisionMakerClient",
  icon: "id",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        label: "Nom",
        name: "name"
      },
      {
        label: "Jeu",
        name: "game.title"
      },
      {
        label: "QRCode",
        name: "qrcode"
      }
    ],
    actions: [
      "new",
      "delete",
      "edit"
    ]
  },
  form: {
    attributes: [
      {
        name: "name",
        label: "Titre",
        placeholder: "Nom du décideur",
        type: "text",
        required: true
      },
      {
        name: "qrcode",
        label: "QRCode",
        placeholder: "QRCode du decision maker",
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
      }
    ]
  },
  delete: {
    labels: {
      entity: "le décideur",
      identifier: "name"
    }
  }
}

export default config
