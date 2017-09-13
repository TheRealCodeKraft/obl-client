const config = {
  route: "specialities",
  title: "Spécialités",
  description: "Modifiez la liste des spécialités disponibles dans le profil",
  client: "SpecialityClient",
  icon: "share",
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
        placeholder: "Nom de la spécialité",
        type: "text",
        required: true
      }
    ]
  },
  delete: {
    labels: {
      entity: "la spécialité",
      identifier: "name"
    }
  }
}

export default config
