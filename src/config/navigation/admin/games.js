const config = {
  route: "games",
  title: "Liste des jeux",
  description: "Créez, modifiez, améliorez les jeux",
  client: "GameClient",
  icon: "joy",
  list: {
    attributes: [
      {
        name: "picture",
        type: "image",
        label: "Image"
      },
      {
        name: "id",
        hidden: true
      },
      {
        label: "Titre",
        name: "title"
      }
    ],
    actions: [
      "new",
      "edit",
      "delete"
    ]
  },
  form: {
    attributes: [
      {
        name: "picture",
        label: "Image",
        type: "image-uploader"
      },
      {
        name: "title",
        label: "Titre",
        placeholder: "Titre du jeu",
        type: "text",
        required: true
      },
      {
        name: "shortname",
        label: "Titre court",
        placeholder: "Titre court du jeu",
        type: "text",
        required: true,
        show: false
      },
      {
        name: "summary",
        label: "Résumé",
        placeholder: "Résumé du jeu",
        type: "text",
        required: true
      },
      {
        name: "status",
        label: "Etat de la session",
        type: "select",
        placeholder: false,
        values: [
          {id: 0, title: "Inactive"},
          {id: 1, title: "Active"}
        ],
        key: "id",
        value: "title",
        required: true,
        defaultValue: -1,
        show: false
      }
    ]
  },
  delete: {
    labels: {
      entity: "le jeu",
      identifier: "title"
    }
  }
}

export default config
