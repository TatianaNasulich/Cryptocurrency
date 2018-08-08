window.onload = function () {
    changeCurrensy();
}

function changeCurrensy() {
    var item = document.querySelectorAll(".slideshow_item_price");
    for (j = 0; j < item.length; j++) {
        var coin_alias = item[j].dataset.coin;
        changeDataInCoin(coin_alias, item[j]);
    }
}

function changeDataInCoin(coin_alias, parentElement) {
    //get currency
    var select = document.getElementsByClassName('custom-select')[1];
    var currency_alias = select.children[0].innerHTML;


    //prepare URL for request
    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var params = coin_alias + currency_alias;
    var getData = baseUrl + params;
    //request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //parse data
            var response = JSON.parse(this.responseText);
            //set data to fields
            //Price
            parentElement.getElementsByClassName('slideshow_item_price_amount')[0].innerHTML = currency(currency_alias) + response.volume;
            //Other fields
            if (currency_symbol == 0) {
                parentElement.getElementsByClassName('slideshow_item_price_count')[0].innerHTML = colorNumbers(response.changes.price.hour, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_day')[0].innerHTML = colorNumbers(response.changes.price.day, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_week')[0].innerHTML = colorNumbers(response.changes.price.week, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_month')[0].innerHTML = colorNumbers(response.changes.price.month, currency_symbol);
            }
            else {
                parentElement.getElementsByClassName('slideshow_item_price_count')[0].innerHTML = colorNumbers(response.changes.percent.hour, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_day')[0].innerHTML = colorNumbers(response.changes.percent.day, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_week')[0].innerHTML = colorNumbers(response.changes.percent.week, currency_symbol);
                parentElement.getElementsByClassName('slideshow_item_price_change_month')[0].innerHTML = colorNumbers(response.changes.percent.month, currency_symbol);
            }
        }
    };
    xhttp.open("GET", getData, true);
    xhttp.send();

    // currency symbol selection
    var coin_state = parentElement.getElementsByClassName('slideshow_item_price_persent_range')[0];
    var currency_symbol;
    if (coin_state.value == 0)
        currency_symbol = '%';
    else {
        currency_symbol = currency(currency_alias);
    }
}

function currency(currency_alias) {
    switch (currency_alias) {
        case "RUB": {
            return '₽';
            break;
        }
        case "EUR": {
            return '€';
            break;
        }
        case "USD": {
            return '$';
            break;
        }
        case "GBP": {
            return '£';
            break;
        }
    }
}

function colorNumbers(number, currency_symbol) {
    if(number >= 0)
        return '<span style="color:#70c446">+ ' + number + currency_symbol + '</span>';
    else
        return '<span style="color:#c80e24"> ' + number + currency_symbol + '</span>';
}

