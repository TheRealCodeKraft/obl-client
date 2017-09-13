const config = {
  route: "schools",
  title: "Ecoles",
  description: "Gérez la liste des écoles accessibles dans le profil",
  client: "SchoolClient",
  icon: "study",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        label: "Name",
        name: "name"
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
        name: "name",
        label: "Nom",
        placeholder: "Nom de l'école",
        type: "text",
        required: true
      }
    ]
  },
  delete: {
    labels: {
      entity: "l'école",
      identifier: "name"
    }
  }
}

export default config
