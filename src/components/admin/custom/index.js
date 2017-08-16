import _TablesManager from './session/tables-manager'
import _SessionLauncher from './session/launcher'
import _ClueLevelsManager from './clues/levels-manager'

export const session = {
  TablesManager: _TablesManager,
  SessionLauncher: _SessionLauncher
}

export const clue = {
  ClueLevelsManager: _ClueLevelsManager
}
