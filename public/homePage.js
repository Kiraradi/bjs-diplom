let logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((result)=> {
       //console.log(JSON.stringify(result));
        if (result.success) {
            location.reload();
        }
    });
};

ApiConnector.current((result) => {
    //console.log(JSON.stringify(result));
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
});

let ratesBoard = new RatesBoard();
function getExchangeRate() {
    ApiConnector.getStocks((result) => {
        //console.log(JSON.stringify(result))
        if (result.success) { 
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}

getExchangeRate();
setInterval(getExchangeRate,60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data,(result) => {
        //console.log(JSON.stringify(result));
        if (result.success) {
            ProfileWidget.showProfile(result.data);
        }
       moneyManager.setMessage(result.success, result.error ?? "Удачное пополнение"); 
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (result) => {
        //console.log(JSON.stringify(result));
        if (result.success) {
            ProfileWidget.showProfile(result.data);
        }
       moneyManager.setMessage(result.success, result.error ?? "Удачное конвертирование"); 
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (result) => {
        //console.log(JSON.stringify(result));
        if (result.success) {
            ProfileWidget.showProfile(result.data);
        }
       moneyManager.setMessage(result.success, result.error ?? "Удачный перевод"); 
    })
}

let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((result) => {
    //console.log(JSON.stringify(result))
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
    }
    moneyManager.updateUsersList(result.data);
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (result) => {
        //console.log(JSON.stringify(result))
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
        }
        favoritesWidget.setMessage(result.success, result.error ?? "Успех")
    })
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (result) => {
        //console.log(JSON.stringify(result))
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
        }
        favoritesWidget.setMessage(result.success, result.error ?? "Контакт удален")
    })
}