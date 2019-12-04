
function getSportData() {
    $('#InnerContent').empty();
    $('#HeaderContent').empty();
    var l_LuisUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/d74420dc-08f6-4e44-be87-b8357b4a4a5f?verbose=true&timezoneOffset=0&subscription-key=a2df65d66e684db08e01ea6419e93ba1&q=";
    var l_IPlayUrl = "http://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none";
    var l_City = "";
    var l_KeyWord = "";
    var l_LandAttr = "";
    var l_Rate = "";
    var l_OpenState = "";
    var l_Country = "";
    var txtKeyword = $('#txtKeyword').val();
    console.log(l_LuisUrl);
    console.log(encodeURI(encodeURI(txtKeyword)));

    var l_Latitude = "";
    var l_Longitude = "";
    var FIX_Latitude = "25.01964";
    var FIX_Longitude = "121.535994";
    var API_Latitude = "";
    var API_Longitude = "";




    //取得定位數據
    //var onSuccess = function (position) {
    //    l_Latitude = position.coords.latitude
    //    l_Longitude = position.coords.longitude
    //    console.log(l_Latitude)
    //};
    //function onError(error) {
    //    console.log(error.message)
    //}

    //开始获取定位数据
    //navigator.geolocation.getCurrentPosition(onSuccess, onError);


    $.ajax({
        url: l_LuisUrl + encodeURI(encodeURI(txtKeyword)),
        type: 'get',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
            $.each(data, function (key1, val1) {
                if (key1 == "entities") {
                    $.each(val1, function (key2, val2) {
                        if (val2.type == "城市") {
                            l_City = val2.resolution.values[0];
                            console.log(l_City);
                        }

                        if (val2.type == "行政區") {
                            l_Country = val2.resolution.values[0];
                            console.log(l_Country);
                        }

                        if (val2.type.indexOf("設施項目") >= 0) {
                            if (val2.role.indexOf("籃球場") >= 0) {

                                l_KeyWord = "&GymType=籃球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("排球場") >= 0) {

                                l_KeyWord = "&GymType=排球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("田徑場") >= 0) {

                                l_KeyWord = "&GymType=田徑場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("運動中心") >= 0) {

                                l_KeyWord = "&GymType=運動中心";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("棒球場") >= 0) {

                                l_KeyWord = "&GymType=棒球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("游泳池") >= 0) {

                                l_KeyWord = "&GymType=游泳池";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("網球場") >= 0) {

                                l_KeyWord = "&GymType=網球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("羽球場") >= 0) {

                                l_KeyWord = "&GymType=羽球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("桌球場") >= 0) {

                                l_KeyWord = "&GymType=桌球場";
                                console.log(l_KeyWord);
                            }

                            if (val2.role.indexOf("高爾夫球場") >= 0) {

                                l_KeyWord = "&GymType=高爾夫球場";
                                console.log(l_KeyWord);
                            }
                        }

                        if (val2.type.indexOf("開放情況") >= 0) {
                            if (val2.role.indexOf("免費開放使用") >= 0) {

                                l_OpenState = "&OpenState=免費開放使用";
                                console.log(l_OpenState);
                            }

                            if (val2.role.indexOf("付費開放使用") >= 0) {

                                l_OpenState = "&OpenState=付費開放使用";
                                console.log(l_OpenState);
                            }

                            if (val2.role.indexOf("不開放使用") >= 0) {

                                l_OpenState = "&OpenState=不開放使用";
                                console.log(l_OpenState);
                            }

                        }

                        if (val2.type.indexOf("評價") >= 0) {
                            if (val2.role.indexOf("y") >= 0) {
                                l_Rate = "Y";
                                console.log(l_Rate);
                            }
                        }

                        //if (val2.type.indexOf("設施屬性") >= 0) {
                        //    if (val2.type.indexOf("設施屬性::學校") >= 0) {

                        //        l_LandAttr = "&LandAttr=學校";
                        //        console.log(l_LandAttr)

                        //    }
                        //    if (val2.type.indexOf("設施屬性::民營") >= 0) {

                        //        l_LandAttr = "&LandAttr=民營";
                        //        console.log(l_LandAttr)

                        //    }
                        //    if (val2.type.indexOf("設施屬性::運動園區") >= 0) {

                        //        l_LandAttr = "&LandAttr=運動園區";
                        //        console.log(l_LandAttr)

                        //    }
                        //    if (val2.type.indexOf("設施屬性::公園") >= 0) {

                        //        l_LandAttr = "&LandAttr=公園";
                        //        console.log(l_LandAttr)

                        //    }
                        //    if (val2.type.indexOf("設施屬性::公有(不含學校、公園、運動園區)") >= 0) {

                        //        l_LandAttr = "&LandAttr=公有(不含學校、公園、運動園區)";
                        //        console.log(l_LandAttr)

                        //    }
                        //}

                    });

                }

            });




            if (l_City != "") {
                l_IPlayUrl += "&City=" + encodeURI(l_City);
            }

            if (l_Country != "") {
                l_IPlayUrl += "&Country=" + encodeURI(l_Country);
            }

            if (l_KeyWord != "") {
                l_IPlayUrl += encodeURI(l_KeyWord);
            }

            if (l_OpenState != "") {
                l_IPlayUrl += encodeURI(l_OpenState);
            }

            //分析Data ，組運動場館URL
            console.log(l_IPlayUrl);

            if (l_IPlayUrl == "http://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none") {
                $('#InnerContent').empty();
                var l_NullContent = "";
                l_NullContent += "  <div class='module-subtitle font-serif' >";
                l_NullContent += "無法找出適合您的場所，請換句話說";
                l_NullContent += "</div >";
                $('#HeaderContent').html(l_NullContent);
            }
            else {
                $.ajax({
                    url: l_IPlayUrl,
                    type: 'get',
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function () {
                        ShowDiv();
                    },
                    complete: function () {
                        HiddenDiv();
                    },
                    success: function (data) {


                        $('#InnerContent').empty();

                        for (var j = 0; j < data.length; j++) {
                            //var C = data[j].GymID
                            //var l_IPlayUrlCharge = " http://iplay.sa.gov.tw/odata/Gym(" + C + ")?$format=application/json;odata.metadata=none&$expand=GymFuncData"
                            data[j].Distance = getDistance(FIX_Longitude, FIX_Latitude, data[j].LatLng.split(",")[1], data[j].LatLng.split(",")[0])
                            //data[j].OpenCharge = getOpenCharge(l_IPlayUrlCharge)
                        }

                        var l_DataList = null;

                        //var l_DataList2 = null;

                        if (l_Rate != "") {
                            if (data.Distance != "") {
                                l_DataList = new JSLINQ(data)
                                    .OrderBy(function (api_ListData) { return api_ListData.Distance })
                                    .ToArray();

                                console.log(l_DataList)


                            }
                            if (l_Rate == "Y") {
                                l_DataList = new JSLINQ(data)
                                    .Where(function (api_ListData) { return api_ListData.Rate >= "3"; })
                                    .OrderByDescending(function (api_ListData) { return api_ListData.Rate })
                                    .ToArray();
                            }
                            console.log(l_DataList)
                        }
                        else {
                            l_DataList = new JSLINQ(data)
                                .OrderBy(function (api_ListData) { return api_ListData.Distance })
                                .ToArray();
                        }
                        console.log(l_DataList.length)
                        //if (l_DataList.length <= 2) {
                        //    for (var k = 0; k <= 1; k++) {

                        //        var C = l_DataList[k].GymID;
                        //        var l_IPlayUrlCharge = "http://iplay.sa.gov.tw/odata/Gym(" + C + ")?$format=application/json;odata.metadata=none&$expand=GymFuncData";
                        //        //l_DataList[k].OpenDay = obj.OpenDay_DataList;
                        //        //l_DataList[k].WebUrl = obj.OpenWebUrl_DataList;
                        //        l_DataList[k].OpenDay = getOpenDay(l_IPlayUrlCharge);
                        //        //l_DataList[k].PassEasyFuncOthers = getPassEasyFuncOthers(l_IPlayUrlCharge);
                        //    }
                        //}
                        //else {
                        //    for (var k = 0; k < 4; k++) {

                        //        var C = l_DataList[k].GymID;
                        //        var l_IPlayUrlCharge = "http://iplay.sa.gov.tw/odata/Gym(" + C + ")?$format=application/json;odata.metadata=none&$expand=GymFuncData";
                        //        //l_DataList[k].OpenDay = obj.OpenDay_DataList;
                        //        //l_DataList[k].WebUrl = obj.OpenWebUrl_DataList;
                        //        l_DataList[k].OpenDay = getOpenDay(l_IPlayUrlCharge);
                        //        //l_DataList[k].PassEasyFuncOthers = getPassEasyFuncOthers(l_IPlayUrlCharge);
                        //    }
                        //}

                        var l_content = "";
                        var l_headerContent = "      <h2 class='module-title font-alt'>以下是最適合您且最近的運動場館</h2>";
                        l_headerContent += "  <div class='module-subtitle font-serif' >";
                        l_headerContent += "我們依您目前的位置，搜尋出距離您最近到最遠的運動場地，您可以往下滑行查看。";
                        l_headerContent += "</div >";
                        var l_length = (l_DataList.length > 30) ? 30 : l_DataList.length

                        //$.each(l_DataList, function (i, item) {
                        for (var i = 0; i < l_DataList.length; i++) {
                            l_content += "<div class='col-sm-6 col-md-4 col-lg-4'>";
                            l_content += "<div class='post mb-20' >";
                            l_content += "<div class='post-thumbnail'>";
                            l_content += "<a href='javascript:void(0)'><img src='" + l_DataList[i].Photo1 + "'></a>";
                            l_content += "</div>";
                            l_content += "<div class='post-header font-alt'>";
                            l_content += "<h2 class='post-title' style=" + "font-size:large;" + "font-weight:bold;" + "><a href=https://iplay.sa.gov.tw/gyminfo/index/" + l_DataList[i].GymID + " >" + l_DataList[i].Name + " " + "(" + l_DataList[i].OpenDay + ")" + " </a></h2>";
                            l_content += "<br><div class='post-meta'style=" + "color:#007799;" + "font-size:small;" + ">";
                            l_content += l_DataList[i].GymFuncList + "<br>電話:" + l_DataList[i].OperationTel + "<br>距離：" + l_DataList[i].Distance + "公里" + "<br>無障礙設施：" + "無" + "<br>評價:" + l_DataList[i].Rate + "<br>開放情況:" + l_DataList[i].OpenState;
                            l_content += "</div>";
                            l_content += "</div>";
                            l_content += "<div class='post-more'>";
                            //l_content += "      <a href='blog-single-right.html' class='more-link'>Read more</a>";
                            l_content += "</div>";
                            l_content += "</div>";
                            l_content += "</div >";
                        }
                        $('#HeaderContent').html(l_headerContent);
                        //var content = "Distance:" + item.Distance + "; Name: " + item.Name + "; Id: " + item.GymFuncList + ";OpenCharge:" + item.OpenCharge;
                        //var li = "<li>" + content + "</li>";
                        $('#InnerContent').append(l_content);
                        //});
                    },
                    error: function (XMLHttpRequest, textStatus, thrownError) {
                        console.log("no");
                    }
                });


            }
        },
        error: function (xhr, textStatus, thrownError) {
            console.log(xhr.responseText);
        }
    });
    document.getElementById("txtKeyword").value = "";

}

function ShowDiv() {
    $("#loading").show();
}
//隱藏載入資料
function HiddenDiv() {
    $("#loading").hide();
}

function rad(d) {
    return d * Math.PI / 180.0;
}

function getDistance(lng1, lat1, lng2, lat2) {
    var EARTH_RADIUS = 6378.137; //地球半徑
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}

        //function getOpenDay(URL) {

        //    var OpenCharge_DataList;
        //    var OpenDay_DataList;

        //    $.ajax({
        //        url: URL,
        //        type: 'get',
        //        dataType: 'json',
        //        contentType: 'application/json',
        //        async: false,
        //        success: function (data2) {

        //            //if (data2.GymFuncData[0].OpenCharge == null) {

        //            //    data2.GymFuncData[0].OpenCharge = "沒有資料";
        //            //}
        //            if (data2.GymFuncData[0].OpenDaySat == true) {
        //                OpenDay_DataList = "本日開放";
        //            }
        //            else {

        //                OpenDay_DataList = "本日不開放";

        //            }

        //            //OpenCharge_DataList = data2.GymFuncData[0].OpenCharge;

        //        }
        //    });

        //    return OpenDay_DataList;

        //}

                    //function getPassEasyFuncOthers(URL) {

                    //    var OpenPassEasyFuncOthers_DataList;

                    //    $.ajax({
                    //        url: URL,
                    //        type: 'get',
                    //        dataType: 'json',
                    //        contentType: 'application/json',
                    //        async: false,
                    //        success: function (data2) {

                    //            if (data2.PassEasyFuncOthers == null || false) {

                    //                data2.PassEasyFuncOthers = "無";
                    //                OpenPassEasyFuncOthers_DataList = data2.PassEasyFuncOthers;
                    //            }
                    //            else {
                    //                OpenPassEasyFuncOthers_DataList = data2.PassEasyFuncOthers;
                    //            }

                    //        }
                    //    });
                    //    return OpenPassEasyFuncOthers_DataList;

                    //}


                    //function getOpenDay(URL) {

                    //    var OpenCharge_DataList;
                    //    var OpenDay_DataList;
                    //    var OpenWebUrl_DataList;

                    //    $.ajax({
                    //        url: URL,
                    //        type: 'get',
                    //        dataType: 'json',
                    //        contentType: 'application/json',
                    //        async: false,
                    //        success: function (data2) {

                    //            //if (data2.GymFuncData[0].OpenCharge == null) {

                    //            //    data2.GymFuncData[0].OpenCharge = "沒有資料";
                    //            //}
                    //            if (data2.GymFuncData[0].OpenDaySat == true) {
                    //                OpenDay_DataList = "本日開放";
                    //            }
                    //            else {

                    //                OpenDay_DataList = "本日不開放";

                    //            }
                    //            OpenWebUrl_DataList = data2.WebUrl;

                    //            //OpenCharge_DataList = data2.GymFuncData[0].OpenCharge;

                    //        }
                    //    });
                    //    return { 'OpenDay_DataList': OpenDay_DataList, 'OpenWebUrl_DataList': OpenWebUrl_DataList};

                    //}