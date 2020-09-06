import mainStore from './mainStore'

const stores = {
    mainStore,
    formsStore: mainStore.formsStore,
    lobbyStore: mainStore.lobbyStore,
    roomStore: mainStore.roomStore,
    newsStore: mainStore.newsStore
}

export default stores