const config = {
  route: "objectives",
  title: "Objectifs",
  description: "Soumettre les informations sur les objectifs des jeux vidéos",
  client: "ObjectiveClient",
  icon: "target",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        label: "Titre",
        name: "title"
      },
      {
        label: "Clé VTS",
        name: "key"
      },
      {
        label: "Cible",
        name: "target"
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
        name: "title",
        label: "Titre",
        placeholder: "Libellé de l'objectif",
        type: "text",
        required: true
      },
      {
        name: "key",
        label: "Clé VTS",
        placeholder: "Clé Scorm du VTS",
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
        name: "target",
        label: "Type d'objectif",
        type: "select",
        placeholder: false,
        values: [
          {id: "none", title: "Aucune"},
          {id: "score", title: "Score"},
          {id: "ca", title: "Chiffre d'affaire"}
        ],
        key: "id",
        value: "title",
        required: true,
        defaultValue: -1
      }
    ]
  },
  delete: {
    labels: {
      entity: "l'objectif",
      identifier: "title"
    }
  }
}

export default config
