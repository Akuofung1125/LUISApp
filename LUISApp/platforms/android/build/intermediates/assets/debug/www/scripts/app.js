var myApp = angular.module('myApp', ['ngCordova'])


    .controller('MainCtrl', ['$http', '$cordovaGeolocation', '$cordovaSpinnerDialog', function ($http, $cordovaGeolocation, $cordovaSpinnerDialog) {



        var self = this;
        self.query = function () {

            $cordovaSpinnerDialog.show("系統訊息", "搜尋中，請稍後‧‧‧", true);

            var l_Latitude = "";
            var l_Longitude = "";

            var posOptions = { timeout: 10000, enableHighAccuracy: false };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    l_Latitude = position.coords.latitude
                    l_Longitude = position.coords.longitude

                    var l_LUISUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f7c27fef-472b-4406-b829-3c09b56f2ea4?subscription-key=9d2eb20b03b340978e351e9f6b0dbb25&verbose=true&timezoneOffset=0&q=";
                    var l_LUISData = document.getElementById('keyword').value;
                    var l_IPlayUrl = "https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none";

                    var l_City = "";
                    var l_KeyWord = "";
                    var l_OpenState = ""; //開放情況：免費開放使用、付費開放使用、不開放使用 
                    var l_RentState = ""; //租借資訊：免費租借、付費租借、不開放租借  暫時沒用到
                    var l_LandAttr = ""; //設施屬性：學校、公園、運動園區、公有(不含學校、公園、運動園區)、民營 
                    var l_Rate = "";   // 設定是否為需要依照評價排序


                    var url = l_LUISUrl + encodeURI(l_LUISData)
                    console.log(url);
                    $http.get(url).
                        then(function (response) {
                            console.log(response.data)
                            $.each(response.data, function (key1, val1) {
                                if (key1 == "entities") {
                                    $.each(val1, function (key2, val2) {
                                        if (val2.type == "城市") {
                                            l_City = val2.resolution.values[0];
                                            console.log(l_City)
                                        }
                                        if (val2.type.indexOf("運動") >= 0) {
                                            l_KeyWord = val2.entity;
                                            console.log(l_KeyWord)
                                        }
                                        if (val2.type.indexOf("地點") >= 0) {
                                            l_KeyWord = val2.entity;
                                            console.log(l_KeyWord)
                                        }

                                        if (val2.type.indexOf("開放情況") >= 0) {
                                            if (val2.type.indexOf("免費") >= 0) {
                                                l_OpenState = "&OpenState=免費開放使用"; //開放情況：免費開放使用、付費開放使用、不開放使用 

                                                console.log(l_OpenState)

                                            }
                                            if (val2.type.indexOf("付費") >= 0) {
                                                l_OpenState = "&OpenState=付費開放使用"; //開放情況：免費開放使用、付費開放使用、不開放使用 
                                                console.log(l_OpenState)
                                            }
                                        }

                                        if (val2.type.indexOf("設施屬性") >= 0) {
                                            if (val2.type.indexOf("設施屬性::學校") >= 0) {
                                                l_LandAttr = "&LandAttr=學校";
                                                console.log(l_LandAttr)
                                            }
                                            if (val2.type.indexOf("設施屬性::民營") >= 0) {
                                                l_LandAttr = "&LandAttr=民營";
                                                console.log(l_LandAttr)
                                            }
                                            if (val2.type.indexOf("設施屬性::運動園區") >= 0) {
                                                l_LandAttr = "&LandAttr=運動園區";
                                                console.log(l_LandAttr)
                                            }
                                            if (val2.type.indexOf("設施屬性::公園") >= 0) {
                                                l_LandAttr = "&LandAttr=公園";
                                                console.log(l_LandAttr)
                                            }
                                            if (val2.type.indexOf("設施屬性::公有(不含學校、公園、運動園區)") >= 0) {
                                                l_LandAttr = "&LandAttr=公有(不含學校、公園、運動園區)";
                                                console.log(l_LandAttr)
                                            }
                                        }

                                        if (val2.type.indexOf("評價") >= 0) {
                                            if (val2.type.indexOf("評價::好") >= 0) {
                                                l_Rate = "Y";
                                            }
                                            if (val2.type.indexOf("評價::差") >= 0) {
                                                l_Rate = "N";
                                            }
                                        }

                                    });
                                }

                            });




                            if (l_City != "") {
                                l_IPlayUrl += "&City=" + encodeURI(l_City);
                            }
                            if (l_KeyWord != "") {
                                l_IPlayUrl += "&Keyword=" + encodeURI(l_KeyWord);
                            }
                            if (l_OpenState != "") {
                                l_IPlayUrl += encodeURI(l_OpenState);
                            }
                            if (l_LandAttr != "") {
                                l_IPlayUrl += encodeURI(l_LandAttr);
                            }


                            console.log(l_IPlayUrl)
                            $http.get(l_IPlayUrl).
                                then(
                                function (response) {
                                    console.log(response)
                                    if (response.status == 200) {
                                        if (response.statusText == "OK") {

                                            $('#InnerContent').empty();

                                            console.log(response.data)

                                            for (var j = 0; j < response.data.length; j++) {
                                                response.data[j].Distance = getDistance(l_Longitude, l_Latitude, response.data[j].LatLng.split(",")[1], response.data[j].LatLng.split(",")[0])

                                            }

                                            var l_DataList = null;


                                            if (l_Rate != "") {

                                                if (l_Rate == "Y") {
                                                    l_DataList = new JSLINQ(response.data)
                                                        .OrderByDescending(function (p_dateListData) { return p_dateListData.Rate })

                                                        .ToArray();
                                                }
                                                if (l_Rate == "N") {
                                                    l_DataList = new JSLINQ(response.data)
                                                        .OrderBy(function (p_dateListData) { return p_dateListData.Distance, p_dateListData.Rate })

                                                        .ToArray();
                                                }

                                            } else {
                                                l_DataList = new JSLINQ(response.data)
                                                    .OrderBy(function (p_dateListData) { return p_dateListData.Distance })
                                                    .ToArray();
                                            }






                                            var l_content = "";
                                            var l_headerContent = "      <h2 class='module-title font-alt'>以下是最適合您且最近的運動場館</h2>";
                                            l_headerContent += "  <div class='module-subtitle font-serif' >";
                                            l_headerContent += "我們依您目前的位置，搜尋出距離您最近到最遠的運動場地，您可以往下滑行查看。";
                                            l_headerContent += "</div >";
                                            var l_length = (l_DataList.length > 30) ? 30 : l_DataList.length
                                            //for (var i = 0; i < response.data.length; i++){
                                            for (var i = 0; i < l_length; i++) {
                                                l_content += "<div class='col-sm-6 col-md-4 col-lg-4'>";
                                                l_content += " <div class='post mb-20' >";
                                                l_content += " <div class='post-thumbnail'>";
                                                l_content += "   <a href='javascript:void(0)'><img src='" + l_DataList[i].Photo1 + "' alt=''></a>";
                                                l_content += " </div>";
                                                l_content += "   <div class='post-header font-alt'>";
                                                l_content += "  <h2 class='post-title'><a href='blog-single-left.html'>" + l_DataList[i].Name + "</a></h2>";
                                                l_content += "   <div class='post-meta'>";
                                                l_content += l_DataList[i].GymFuncList + " | 電話:" + l_DataList[i].OperationTel + " | 距離：" + l_DataList[i].Distance + "公里";
                                                l_content += " </div>";
                                                l_content += " </div>";
                                                l_content += "  <div class='post-more'>";
                                                l_content += "      <a href='blog-single-right.html' class='more-link'>Read more</a>";
                                                l_content += "  </div>";
                                                l_content += "  </div>";
                                                l_content += "  </div >";
                                            }
                                            $('#HeaderContent').html(l_headerContent)
                                            $('#InnerContent').append(l_content)

                                            $cordovaSpinnerDialog.hide();
                                            ScrollTo('news')
                                        }
                                    }
                                })

                        })
                }, function (err) {
                    // error
                    alert(err)
                    $cordovaSpinnerDialog.hide();
                });

            //將用角度表示的角轉換為近似相等的用弧度表示的角 java Math.toRadians
            function rad(d) {
                return d * Math.PI / 180.0;
            }

            function getDistance(lng1, lat1, lng2, lat2) { //lng經度 lat緯度
                var EARTH_RADIUS = 6378.137; //地球半徑
                var radLat1 = rad(lat1); //rad弧度
                var radLat2 = rad(lat2);
                var a = radLat1 - radLat2;
                var b = rad(lng1) - rad(lng2);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) //sin正弦
                    + Math.cos(radLat1) * Math.cos(radLat2)
                    * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000;
                return s;
            }

            function ScrollTo(id_name) {
                $('html,body').animate({
                    scrollTop: $('#' + id_name).offset().top
                }, 1000);
            }

        }



    }])//控制選單