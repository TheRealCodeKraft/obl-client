import _SessionView from './session/view'
import _TablesManager from './session/tables-manager'
import _SessionLauncher from './session/launcher'
import _Inviter from './session/inviter'

import _ClueLevelsManager from './clues/levels-manager'
import _QrCodesManager from './clues/qr-codes'

import _Archive from './scenario/archive'

export const session = {
  SessionView: _SessionView,
  TablesManager: _TablesManager,
  SessionLauncher: _SessionLauncher,
  Inviter: _Inviter
}

export const clue = {
  ClueLevelsManager: _ClueLevelsManager,
  QrCodesManager: _QrCodesManager
}

export const scenario = {
  Archive: _Archive
}
