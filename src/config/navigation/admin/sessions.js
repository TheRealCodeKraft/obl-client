import SessionView from 'components/admin/sessions/view'
import TablesManager from 'components/admin/sessions/tables-manager'
import Inviter from 'components/admin/sessions/inviter'
import SessionLauncher from 'components/admin/sessions/launcher'

const config = {
  route: "sessions",
  title: "Liste des sessions",
  description: "Accédez à la liste de toutes les sessions",
  client: "SessionClient",
  icon: "date",
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
        label: "Jeu",
        name: "game.title"
      },
      {
        label: "Joueurs",
        name: "players.length"
      }
    ],
    actions: [
      "new",
      {
        action: "see",
        label: "Suivre la session",
        icon: "look",
        component: SessionView
      },
      "delete",
      "edit",
      {
        action: "manage_tables",
        label: "Joueurs",
        icon: "users",
        component: TablesManager
      },
      {
        action: "invite",
        label: "Envoyer des invitations",
        icon: "paper-plane",
        component: Inviter
      },
      {
        action: "launch",
        label: "Lancer la session",
        icon: "play",
        component: SessionLauncher,
        displayIf: {
	  property: "playable",
	  values: ["to_launch", "pause"]
        },
        tinify: true
      },
      {
        action: "pause",
        label: "Stand-by",
        icon: "moon",
        component: SessionLauncher,
        displayIf: {
	  property: "playable",
	  value: "play"
        },
        tinify: true
      },
      {
        action: "next-round",
        label: "Continuer la session",
        icon: "next",
        component: SessionLauncher,
        displayIf: {
	  property: "current_step",
	  value: "end"
        },
        tinify: true
      }
    ]
  },
  form: {
    attributes: [
      {
        name: "title",
        label: "Titre",
        placeholder: "Titre de la session",
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
        required: true,
        show: false
      },
      {
        name: "start_ts",
        label: "Date d'ouverture",
        placeholder: "Ouverture du jeu",
        type: "date",
        required: true,
        show: false
      },
      {
        name: "end_ts",
        label: "Date de fermeture",
        placeholder: "Fermeture du jeu",
        type: "date",
        required: true,
        show: false
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
      entity: "la session",
      identifier: "title"
    }
  },
  watcher: {
    channel: "SessionChannel",
    if: {
      property: "playable",
      value: "play"
    }
  }
}

export default config

