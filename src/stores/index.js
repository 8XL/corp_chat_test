import mainStore from './mainStore'

const stores = {
    mainStore,
    formsStore: mainStore.formsStore,
    lobbyStore: mainStore.lobbyStore,
    roomStore: mainStore.roomStore,

}

export default stores