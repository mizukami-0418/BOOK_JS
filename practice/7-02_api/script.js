'use strict';

// geolocation 自分の位置情報を取得
function success(pos) {
  ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
  alert('位置情報の取得失敗。エラーコード:' + error.code);
}

navigator.geolocation.getCurrentPosition(success, fail);

// UTCをミリ秒に変換
function utcToJSTime(utcTime) {
  return utcTime * 1000;
}

// 天気予報データ取得
function ajaxRequest(lat, long) {
  // 定数を定義し、それぞれリクエスト先のURLとAPI keyを代入
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  const appId = '4cc0b4f657cfea2efa3a5c02256d1ca2';
  /* jQueryの$.ajaxメソッドを使いAPIにデータをリクエストする
  $.ajaxメソッドのパラメータにdataプロパティを追加 */
  $.ajax({
    url: url,
    data: {           // リクエストしたデータはdataに保存されている
      appid: appId,   // API Key
      lat: lat,       // 緯度 ajaxRequestファンクションを呼び出し受け取るパラメータ
      lon: long,      // 経度 上に同じ
      units: 'metric',// データの単位を取得。metricはメートル法、摂氏のデータを取得可能
      lang: 'ja',
    }
  })
  .done(function(data) {

    // 都市名、国名
    $('#place').text(data.city.name + ',' + data.city.country);

    // 天気予報データの取得 繰り返し読み取るのにforEachメソッドを使用 処理が繰り返されるたびに、forecastに保存される
    data.list.forEach(function(forecast, index) {
      const dateTime = new Date(utcToJSTime(forecast.dt));
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      const hours = dateTime.getHours();
      const min = String(dateTime.getMinutes()).padStart(2, '0');
      const temperature = Math.round(forecast.main.temp); // 小数点以下を四捨五入し、temperatureに代入
      const description = forecast.weather[0].description;
      const iconPath = `images/${forecast.weather[0].icon}.svg`;

      // 現在の天気とそれ以外で出力を変える
      if(index === 0) {
        const currentWeather = `
        <div class="icon"><img src="${iconPath}"></div>
        <div class="info">
          <p>
            <span class="description">現在の天気:${description}</span>
            <span class="temp">${temperature}</span>度
          </p>
        </div>`;
        $('#weather').html(currentWeather);
      } else {
        const tableRow = `
        <tr>
          <td class="info">
            ${month}/${date} ${hours}:${min}
          </td>
          <td class="icon"><img src="${iconPath}"></td>
          <td><span class="temp">${temperature}度</span></td>
        </tr>`;
        $('#forecast').append(tableRow);
      }
    });
  })
  .fail(function() {
    console.log('$.ajax failed!');
  })
}