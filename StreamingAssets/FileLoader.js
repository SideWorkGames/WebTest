window.ReadExcelFile = function () {
    var fileInput = document.getElementById('fileInput');
    if (!fileInput || fileInput.files.length === 0) return;

    var file = fileInput.files[0]; // 선택된 파일
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var firstSheet = workbook.SheetNames[0]; // 첫 번째 시트 가져오기
        var sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]); // 시트를 JSON으로 변환

        SendDataToUnity(JSON.stringify(sheetData)); // Unity로 JSON 데이터 전달
    };

    reader.readAsArrayBuffer(file); // 파일을 바이너리로 읽기
};

// Unity로 JSON 데이터 전달
window.SendDataToUnity = function (data) {
    if (typeof gameInstance !== "undefined")
    {
        console.log("호출 완료");
        gameInstance.SendMessage('DB_Manager', 'ReceiveExcelData', data);
    } 
    else 
    {
        console.log("gameInstance가 정의되지 않음");
    }
};