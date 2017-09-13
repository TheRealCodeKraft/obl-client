const config = {
  route: "areas",
  title: "Zones géo.",
  description: "Prenez en main la liste des zones géographiques",
  client: "AreaClient",
  icon: "map-marker",
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
        placeholder: "Nom de la zone géo",
        type: "text",
        required: true
      }
    ]
  },
  delete: {
    labels: {
      entity: "la zone géo",
      identifier: "name"
    }
  }
}

export default config
