const url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314";
const dataArea = document.querySelector('[data-area]');
let apiData
let apiTime

dataArea.addEventListener('change', e => {
    getCity(e)
    getTemp(e)
})

//取得資料
function getData(){
    axios.get(url)
    .then( response => {
        //22個縣市
        apiData = response.data.records.location;
        apiData.forEach( item => {
            let locationName = `<option value="${item.locationName}" >${item.locationName}</option>`
            dataArea.innerHTML += locationName;
        });

        //3個時段
        apiTime = response.data.records.location[0].weatherElement[3].time;
        let time = document.querySelectorAll('.time');
        let timeArr = [];
        for(let i = 0;i < apiTime.length; i++){
            timeArr.push(apiTime[i].startTime.slice(5) + " ~ " + apiTime[i].endTime.slice(5))
            time[i].textContent = timeArr[i]
        }
    })
    .catch( error => {
        console.log(error);
    })
}

//顯示 選單中所選的縣市
function getCity(e){
    let area = document.querySelector('.area')
    let areaArr = [];
    let select = e.target.value
    apiData.forEach( item => {
        if(select === item.locationName || ""){
            areaArr.push(item)
            area.textContent = select
        }
    })
}

//溫度
function getTemp(e){
    const dataMin = document.querySelectorAll('[data-min]');
    const dataMax = document.querySelectorAll('[data-max]');
    let select = e.target.value
    let minTempArr = []
    let maxTempArr = []
    for(let i = 0; i < 22; i++){
        if (select === apiData[i].locationName){
            for(let j = 0; j < 3; j++){
                minTempArr.push( apiData[i].weatherElement[2].time[j].parameter.parameterName )
                maxTempArr.push( apiData[i].weatherElement[4].time[j].parameter.parameterName )
                dataMin[j].textContent = minTempArr[j] + "℃"
                dataMax[j].textContent = maxTempArr[j] + "℃"
            }
        }
    }     
}

getData()





 
    
