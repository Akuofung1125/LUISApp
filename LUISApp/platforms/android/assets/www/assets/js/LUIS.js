


/* 注意！　請在下方定義是為正式機或開發機*/

//正式機
var _domainUrl = 'pro'

////測試機
//var _domainUrl = 'qa'




/* 注意！　必須放在JQuery後面*/

var LUIS = LUIS || {}, LUIS =
{


    /*
    var Data = 
    { 
       {Key1:value1,Key2:value2},       
       {Key1:value1,Key2:value2},
    }

   LUIS.post('l_url',l_Data,function ResultFun(p_Result) 
   { 
     
     //p_Result = data 
   
   });
   
   */

    post: function (p_Url, p_Data, p_Callback) {
        $.ajax({
            url: p_Url,
            type: 'POST',
            data: p_Data,
            dataType: 'json',
            success: function (data) {
                p_Callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                p_Callback(xhr.responseText);
            }
        });
    },

    /*
    var Data = 
    { 
       key1:value1,key2:value2
    }

    LUIS.get('l_url',l_Data,function ResultFun(p_Result) 
    { 

    //p_Result = data 

    });

    */
    get: function (p_Url, p_Data, p_Callback) {
        var l_parm = '';
       
        console.log(p_Url + p_Data)
        $.ajax({
            url: p_Url + p_Data,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                p_Callback(data);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                p_Callback(xhr.responseText);
            }
        });
    },


    setLocalStorage: function (strSessionName, data) {
        var strObj = JSON.stringify(data);
        window.localStorage.setItem(strSessionName, strObj);

    },

    getLocalStorage: function (strSessionName) {
        var strObject = window.localStorage.getItem(strSessionName);
        return JSON.parse(strObject);
    },


    /// LUIS.getDomainURL(p_value')
    getDomainURL: function (p_service) {

        switch (_domainUrl) {
            case 'pro': //正式環境
                return 'http://www.plic.com.tw/SlnLogisticsWebAPI/' + LUIS.getHttpURL(p_service)
            case 'qa': //測試環境 
                return 'http://www.plic.com.tw/SlnLogisticsWebAPITest/' + LUIS.getHttpURL(p_service)
        }
    },
    /// LUIS.getHttpURL('p_value')
    getHttpURL: function (p_value) {

        switch (p_value) {
            case 'driver-status':
                return 'api/Driver_Status'
            case 'file':
                return 'api/File'
            case 'retail':
                return 'api/Retail'
            case 'abnormal':
                return 'api/Abnormal'
            case 'Driver_Bulletin':
                return 'api/Driver_Bulletin'
            case 'Driver_Circular':
                return 'api/Driver_Circular'
            case 'Driver_UserInfo':
                return 'api/Driver_UserInfo'
            case 'Driver_Phone':
                return 'api/Driver_Phone'
            case 'Driver_CarPhotoItem':
                return 'api/Driver_CarPhotoItem'
            case 'Driver_CarResponse':
                return 'api/Driver_CarResponse'
            case 'Driver_LaborHealth':
                return 'api/Driver_LaborHealth'
            case 'Driver_GroupBao':
                return 'api/Driver_GroupBao'
            case 'Driver_Setting':
                return 'api/Driver_Setting'
            case 'Driver_ApplyItem':
                return 'api/Driver_ApplyItem'
            case 'Driver_Apply':
                return 'api/Driver_Apply'
            case 'Driver_ResponseClass':
                return 'api/Driver_ResponseClass'
            case 'Driver_Response':
                return 'api/Driver_Response'
            case 'Driver_ResponseAttach':
                return 'api/Driver_ResponseAttach'
            case 'Driver_Salary':
                return 'api/Driver_Salary'
            case 'Driver_NewUser':
                return 'api/Driver_NewUser'
            case 'Driver_CarNumber':
                return 'api/Driver_CarNumber'
            case 'Driver_AppVersion':
                return 'api/Driver_AppVersion'
            case 'Driver_ForgotPassword':
                return 'api/Driver_ForgotPassword'
            case 'Driver_ChangePassword':
                return 'api/Driver_ChangePassword'
                
            default:
                return '';
        }
    },

    //LUIS.setDateZero('p_value')
    //把JS轉的日期 少於10的多0
    setDateZero: function (p_value) {
        if (p_value < 10) {
            p_value = "0" + p_value;
        }
        return p_value.toString();
    },


    /// LUIS.getLocalStorageName('p_value')
    getLocalStorageName: function (p_value) {
        switch (p_value) {
            case 'UserInfo':
                return 'UserInfo'
            case 'ONTIME_QUERY':
                return 'ONTIME_QUERY'
            case 'ONTIME_QUERY':
                return 'ONTIME_QUERY'
            case 'ONTIME_QUERY':
                return 'ONTIME_QUERY'
            case 'CAR_NUMBER':
                return 'CAR_NUMBER'
            case 'isTodayFirstTimeLoginDate':
                return 'isTodayFirstTimeLoginDate'
            case 'IS_FRIST_TIME_LOGIN':
                return 'IS_FRIST_TIME_LOGIN'
            case 'IS_LOGIN_INSERT_DEVICE_LOG': //2017/10/30 用來判斷是否為自動登入或登入狀態，如果是，則均需寫入DEVICE_LOG的新需求
                return 'IS_LOGIN_INSERT_DEVICE_LOG'

            default:
                return '';
        }
    },
    setDefaultDate: function (p_value) {
        var date = new Date(p_value)
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + LUIS.setDateZero(month) + '-' + LUIS.setDateZero(day);
    },

    /// LUIS.getDate()
    getDate: function () {
        var date = new Date()
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '/' + LUIS.setDateZero(month) + '/' + LUIS.setDateZero(day);
    },

    /// LUIS.getTime()
    getTime: function () {
        var date = new Date()

        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        return LUIS.setDateZero(hour) + ':' + LUIS.setDateZero(min) + ':' + LUIS.setDateZero(sec);
    },

    //LUIS.setDefaultDateTime()
    setDefaultDateTime: function () {
        var date = new Date()
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        return year + '/' + LUIS.setDateZero(month) + '/' + LUIS.setDateZero(day) + ' ' + LUIS.setDateZero(hour) + ':' + LUIS.setDateZero(min) + ':' + LUIS.setDateZero(sec);
    },



    //tryParse Int 並預設  defaultValue  如果可以轉換 則回傳轉換值，不行則回傳Default值
    //LUIS.tryParseInt(str,defaultValue)
    tryParseInt: function (str, defaultValue) {
        var retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    },

    //四捨五入至小數第[pos]位
    //LUIS.formatFloat(str,defaultValue)
    formatFloat: function (num, pos) {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    },

    //LUIS.getGuid()
    getGuid: function () {

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();

    },

    //LUIS.getSplitStringArray(value)
    getSplitStringArray: function (str) {
        var l_array = [];
        l_array = str.split(",");
        return l_array;

    },

    //LUIS.getWeekFirstDay()
    getWeekFirstDay: function () {
        var Nowdate = new Date();
        var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);

        var year = WeekFirstDay.getFullYear();
        var month = LUIS.setDateZero((WeekFirstDay.getMonth() + 1));
        var date = LUIS.setDateZero(WeekFirstDay.getDate());

        var l_day = year + '/' + month + '/' + date

        return l_day;

    },
    //LUIS.getWeekLastDay()
    getWeekLastDay: function () {
        var Nowdate = new Date();
        var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
        var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        var year = WeekLastDay.getFullYear();
        var month = LUIS.setDateZero((WeekLastDay.getMonth() + 1));
        var date = LUIS.setDateZero(WeekLastDay.getDate());
        var l_day = year + '/' + month + '/' + date

        return l_day;
    },
    //LUIS.getMonthFirstDay()
    getMonthFirstDay: function () {
        var Nowdate = new Date();

        var year = Nowdate.getFullYear();
        var month = LUIS.setDateZero((Nowdate.getMonth() + 1));
        var date = '01';

        var l_day = year + '/' + month + '/' + date

        return l_day;

    },
    //LUIS.getMonthLastDay()
    getMonthLastDay: function () {
        var Nowdate = new Date();
        Nowdate.setDate(1);
        Nowdate.setMonth(Nowdate.getMonth() + 1);
        Nowdate.setDate(Nowdate.getDate() - 1);
        var year = Nowdate.getFullYear();
        var month = LUIS.setDateZero((Nowdate.getMonth() + 1));
        var date = LUIS.setDateZero(Nowdate.getDate());

        var l_day = year + '/' + month + '/' + date

        return l_day;

    },
    //LUIS.setDefaultDay(val)
    setDefaultDay: function (p_val) {
        var day_list = ['日', '一', '二', '三', '四', '五', '六'];
        var date = new Date(p_val)
        var day = date.getDay();

        return '(' + day_list[day] + ')';
    },

    setDateTimeAMOrPM: function (p_val) {

        var d = new Date(p_val);
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "上午";
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "下午";
        }
        if (h == 0) {
            h = 12;
        }

        h = h < 10 ? "0" + h : h;

        m = m < 10 ? "0" + m : m;

        s = s < 10 ? "0" + s : s;

        /* if you want 2 digit hours:
        h = h<10?"0"+h:h; */

        //var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

        var replacement = dd;
        /* if you want to add seconds
        replacement += ":"+s;  */
        replacement += " " + h + ":" + m + ":" + s;

        return replacement;
    },

}