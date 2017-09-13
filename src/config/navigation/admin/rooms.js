const config = {
  route: "rooms",
  title: "Salles",
  description: "Créez, modifiez, supprimez les salles d'une session",
  client: "RoomClient",
  icon: "airplay",
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
        name: "session.game.title"
      },
      {
        label: "Session",
        name: "session.title"
      },
      {
        label: "QRCode",
        name: "qrcode"
      },
      {
        label: "Description",
        name: "description"
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
        placeholder: "Titre de la salle",
        type: "text",
        required: true
      },
      {
        name: "qrcode",
        label: "QRCode",
        placeholder: "QRCode de la salle",
        type: "text",
        required: true
      },
      {
        name: "description",
        label: "Description",
        placeholder: "Description de la salle",
        type: "text",
        required: true,
        show: false
      },
      {
        name: "session_id",
        label: "Session",
        placeholder: "Sélectionnez une session",
        type: "select",
        values: {
          targetState: "sessionState",
          targetValue: "sessions",
          client: "SessionClient",
          func: "fetchAll"
        },
        key: "id",
        value: "title",
        required: true,
        defaultValue: "-1"
      }
    ]
  },
  delete: {
    labels: {
      entity: "la salle",
      identifier: "name"
    }
  }
}

export default config
