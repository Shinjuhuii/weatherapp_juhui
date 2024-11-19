$(document).ready(function () {
    // 지역 정보
    let region = {

        Siheung: {
            lat: 37.3217,
            lon: 126.8309
        },
        Nuuk: {
            lat: 64.1835,
            lon: -51.7216
        }
        
    };





    
    // API URLs
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + region.Siheung.lat + '&lon=' + region.Siheung.lon + '&units=metric&appid=1da81b706d0af123d88a7ab18f8286db';
    let urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + region.Siheung.lat + '&lon=' + region.Siheung.lon + '&units=metric&appid=1da81b706d0af123d88a7ab18f8286db';

    WeatherService(url);
    ForecastWeatherService(urlForecast);

    // ------------------------------
    // 기본 기능
    // ------------------------------
    $(document).ready(function() {
        // moment.js로 오늘 날짜를 'M월 D일' 형식으로 가져오기
        const formattedDate = moment().format('M월 D일'); // 예: 11월 17일
    
        // current-date에 날짜를 추가
        $('#current-date').text(formattedDate);
    
        // 'current-location'에 예시로 '경기도 시흥시'를 추가
        $('#current-location').text('경기도 시흥시');
    });
    
        
        $.getJSON(url, function (data) {
            //아이콘 가져오깅
            let icons = data.weather[0].icon
            let iconURL= "./icon/" + icons + ".svg"
            
            $('.w-icon').html("<img src ='" + iconURL+ "'>"  )

            
            let test = data.main.temp
            let raintest = data.rain

            // let test = 20
            // let raintest = 1
            
            let imgtoma;

            if (raintest > 0) {
                // 비가 오는 경우
                imgtoma = "tomato5.png";
            } else {
                // 비가 오지 않는 경우 온도에 따라 이미지 선택
                if (test >= 10 && test <= 20) {
                    imgtoma = "tomato1.png"; // 10도 ~ 20도
                } else if (test >= 20 && test <= 30) {
                    imgtoma = "tomato2.png"; // 20도 ~ 30도
                } else if (test >= -3 && test <= 9) {
                    imgtoma = "tomato3.png"; // -3도 ~ 9도
                } else if (test <= -4 || test >= 31) {
                    imgtoma = "tomato4.png"; // -4도 이하 또는 31도 이상
                }
            }
            
            
            console.log(imgtoma)
            let imgsrc = `<img src='${imgtoma}' alt='Image' class='bounce-effect'>`;
            $('.tomatoimg').html(imgsrc)


            // 현재 온도
            const currentTemp = Math.floor(data.main.temp);
            $('#current-temp2').html(`${currentTemp}<span class="degree" >°</span>`);
    
            // 최고 온도
            const maxTemp = Math.floor(data.main.temp_max);
            $('#current-maxTemp').html(`${maxTemp}<span class="degree2">°</span>`);
    
            // 최저 온도
            const minTemp = Math.floor(data.main.temp_min);
            $('#lowest-temp').html(`${minTemp}<span class="degree2">°</span>`);
        });
    
    
    $(document).ready(function () {
        // 페이지 로드 시 각 .grid의 .content, .content-bg를 숨기지 않도록 설정
        // 첫 클릭 전에는 다른 grid의 콘텐츠가 영향을 미치지 않도록 설정.
        $('.grid').each(function() {
            // 초기 상태에서 .content와 .content-bg가 보이도록 설정
            $(this).find('.content, .content-bg').hide();
        });
    
        // 화살표 클릭 시 해당하는 grid만 반응하도록 수정
        $('.content-arrow').click(function () {
            $(this).toggleClass("arrowClicked");  // 화살표 회전 효과 토글
    
            // 클릭한 화살표의 부모 .grid 내부의 .content, .content-bg 찾기
            var contentDiv = $(this).closest('.grid').find('.content, .content-bg');
    
            // 클릭한 화살표가 속한 .grid에서만 반응하도록 설정
            if ($(this).hasClass("arrowClicked")) {
                // 화살표 클릭 상태이면 내용을 보여줌
                if (!contentDiv.is(':visible')) {  // 이미 보이는 상태인지 확인
                    contentDiv.stop(true, true).slideDown(300);  // 애니메이션 중복 방지 및 부드럽게 표시
                }
            } else {
                // 화살표 클릭 상태 해제이면 내용을 숨김
                if (contentDiv.is(':visible')) {  // 이미 숨겨진 상태인지 확인
                    contentDiv.stop(true, true).slideUp(300);  // 애니메이션 중복 방지 및 부드럽게 숨김
                }
            }
        });
    });
    
    
    

    // 지역 검색 버튼 클릭
    $('#search').click(function () {
        $('#search-frame').css('bottom', '0');
        $('#overlayBG').css('display', 'block');
    });

    // 검색창 닫기 버튼
    $('#clear, #overlayBG').click(function () {
        $('#search-frame').css('bottom', '-700px');
        $('#overlayBG').css('display', 'none');
    });

    // 지역 선택
    $('#Bucheon, #Ansan, #Suwon').click(function () {
        let selectedRegion = $(this).attr('id');
        let selected = region[selectedRegion === 'Bucheon' ? 'Bucheon' :
            selectedRegion === 'Ansan' ? 'Siheung' : 'Gangneung'];

        url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + selected.lat + '&lon=' + selected.lon + '&units=metric&appid=1da81b706d0af123d88a7ab18f8286db';
        urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + selected.lat + '&lon=' + selected.lon + '&units=metric&appid=1da81b706d0af123d88a7ab18f8286db';

        WeatherService(url);
        ForecastWeatherService(urlForecast);
        $(".forecast-info").remove();
        $(".forecast-divide").remove();
        $('#overlayBG').click();
    });

    // ------------------------------
    // 팝업 관련 기능
    // ------------------------------

    $(document).ready(function () {
        // 팝업 열기
        $('#open-popup').click(function () {
            $('#location-popup').removeClass('hidden').fadeIn(); // hidden 클래스 제거하여 팝업 표시
        });
    
        // 팝업 닫기
        $('#close-popup').click(function () {
            $('#location-popup').fadeOut(function () {
                $(this).addClass('hidden'); // hidden 클래스 추가하여 팝업 숨김
            });
        });
    
        // 팝업 외부 클릭 시 닫기
        $(document).mouseup(function (e) {
            const popup = $('#location-popup');
            if (!popup.is(e.target) && popup.has(e.target).length === 0) {
                popup.fadeOut(function () {
                    $(this).addClass('hidden');
                });
            }
        });
    });
    

    // ------------------------------
    // 날씨 데이터 로드 기능
    // ------------------------------

    function WeatherService(url) {
        $.getJSON(url, function (data) {
            console.log(data);

            // 현재 지역
            let currentRegion = data.name;
            switch (currentRegion) {
                case "Ansan-si":
                    currentRegion = "경기도 시흥시";
                    break;

            }
            $('#current-region').text(currentRegion);

            // 현재 날씨
            
            let currentTemp = Math.floor(data.main.temp);
            $('#current-temp').html(`${currentTemp}<span class="degree">°</span>`);
            
            let currentMaxtemp = Math.floor(data.main.temp_max);
            $('#current-maxTemp').html(`최고: ${currentMaxtemp}<span class="degree1">°</span>`);

            let currentMintemp = Math.floor(data.main.temp_min);
            $('#lowest-temp').html(`${currentMintemp}<span class="degree1">°</span>`);


            $(document).ready(function () {
                function updateHumidity(lat, lon) {
                    // API URL 구성
                    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1da81b706d0af123d88a7ab18f8286db`;
            
                    // API 호출하여 습도 업데이트
                    $.getJSON(url, function (data) {
                        let humidity = data.main.humidity;
            
                        // 습도 값 삽입
                        $('#humidity .content2').html(humidity + '<span>%</span>');
                    });
                }
            
                // 초기값: 시흥시 습도
                updateHumidity(37.3217, 126.8309);
            
                // 지역 선택 이벤트 핸들러
                $('#select-bucheon').click(function () {
                    updateHumidity(37.3217, 126.8309); // 시흥시 좌표
                });
            
                $('#select-suwon').click(function () {
                    updateHumidity(64.183, -51.721); // NUUK(그린란드) 좌표
                });
            });
            

            
            
            // 불쾌지수
            let THI = calcTHI(humidity);
            $('#THI .content').text(THI);

            function calcTHI(_humidity) {
                let DPT = currentTemp - ((100 - _humidity) / 5);
                return Math.floor(0.72 * (currentTemp + DPT) + 40.6);
            }
        });
    }


    
    function ForecastWeatherService(urlForecast) {
        $.getJSON(urlForecast, function (data) {
            console.log(data);
            $('#forecast').empty();

            data.list.slice(0, 5).forEach(function (item) {
                let fcTemp = Math.floor(item.main.temp);
                let fcTime = moment(item.dt * 1000).format('HH시');
                $('#forecast').append('<div class="forecast-info">' + fcTime + ': ' + fcTemp + '°</div>');
            });
        });
    }

});$(document).ready(function () {
    // 지역 정보
    const region = {
        Siheung: { lat: 37.3217, lon: 126.8309 },
        Nuuk: { lat: 64.1835, lon: -51.7216 }
    };

    // OpenWeatherMap API 키
    const apiKey = '1da81b706d0af123d88a7ab18f8286db';

    // URL 생성 함수
    const createWeatherURL = (lat, lon) =>
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const createForecastURL = (lat, lon) =>
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    // 초기 URL 설정
    let currentWeatherURL = createWeatherURL(region.Siheung.lat, region.Siheung.lon);
    let forecastURL = createForecastURL(region.Siheung.lat, region.Siheung.lon);

    // 초기 날씨 데이터 로드
    WeatherService(currentWeatherURL);
    ForecastWeatherService(forecastURL);

    // 오늘 날짜 표시
    const formattedDate = moment().format('M월 D일');
    $('#current-date').text(formattedDate);

    // 팝업 열기
    $('#open-popup').click(function () {
        $('#location-popup').removeClass('hidden').fadeIn();
    });

    // 팝업 닫기
    $('#close-popup, #location-popup').click(function (e) {
        if (e.target.id === 'close-popup' || e.target.id === 'location-popup') {
            $('#location-popup').fadeOut().addClass('hidden');
        }
    });

    // 지역 선택
    $('#select-bucheon, #select-suwon').click(function () {
        const selectedRegion = $(this).attr('id') === 'select-bucheon' ? 'Siheung' : 'Nuuk';
        const selected = region[selectedRegion];

        currentWeatherURL = createWeatherURL(selected.lat, selected.lon);
        forecastURL = createForecastURL(selected.lat, selected.lon);

        WeatherService(currentWeatherURL);
        ForecastWeatherService(forecastURL);

        $('#location-popup').fadeOut().addClass('hidden');
    });

    // 날씨 데이터 로드 함수
    function WeatherService(url) {
        $.getJSON(url, function (data) {
            const currentTemp = Math.floor(data.main.temp);
            const maxTemp = Math.floor(data.main.temp_max);
            const minTemp = Math.floor(data.main.temp_min);

            $('#current-temp2').html(`${currentTemp}<span class="degree">°</span>`);
            $('#current-maxTemp').html(`${maxTemp}<span class="degree2">°</span>`);
            $('#lowest-temp').html(`${minTemp}<span class="degree2">°</span>`);
        });
    }

    // 주간 예보 데이터 로드 함수
    function ForecastWeatherService(url) {
        $.getJSON(url, function (data) {
            const dailyWeather = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
            $('#humidity2 .text5').empty();

            dailyWeather.forEach(item => {
                const dayOfWeek = new Date(item.dt * 1000).toLocaleString('ko-KR', { weekday: 'short' });
                const maxTemp = Math.floor(item.main.temp_max);
                const minTemp = Math.floor(item.main.temp_min);

                const grayDiv = $(`
                <div class="gray-rectangle">
                    <span class="text6-1">${dayOfWeek}</span>
                    <span class="text6">${minTemp}°</span>
                    <span style="
                        
                        width: 30px;
                        height: 1px;
                        background-color: rgba(56,56,56);
                        
                        
                        margin: 0 0px; /* 숫자와 구분선 사이 간격 조정 */
                    "></span>
                    <span class="text6">${maxTemp}°</span>
                </div>
            `).css({
                width: '100%',
                height: '50px',
                backgroundColor: '#F3F3F3',
                borderRadius: '21px',
                marginTop: '10px',
                display: 'flex',
                
                alignItems: 'center',
                padding: '0 15px'
            });
            
                $('#humidity2 .text5').append(grayDiv);
            });
        });
    }
});
// ------------------------------
// 온도에 따라 바뀌는 글씨와 사진
// ------------------------------
$(document).ready(function () {
    // 기본 좌표: 시흥
    let currentLat = 37.3217;
    let currentLon = 126.8309;
    const apiKey = "1da81b706d0af123d88a7ab18f8286db";

    // 메시지와 이미지를 업데이트하는 함수
    function updateWeatherInfo(lat, lon) {
        // API URL
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        // API 호출
        $.getJSON(url, function (data) {
            // 현재 온도와 강수량 가져오기
            let temperature = data.main.temp; // 온도
            let raintest = data.rain ? data.rain["1h"] || 0 : 0; // 강수량

            console.log("현재 온도:", temperature, "강수량:", raintest);

            // 메시지 업데이트
            updateDynamicWeatherMessage(temperature);
            

            // 이미지 업데이트
            updateTomatoImage(temperature, raintest);
        }).fail(function () {
            console.error("API 데이터를 가져오지 못했습니다.");
            $(".weather-message-dynamic1").html("날씨 데이터를 불러올 수 없습니다.");
        });
    }

    // 메시지 업데이트 함수
    function updateDynamicWeatherMessage(temperature) {
        let message = "";
        if (temperature <= -10) {
            message = "<strong style='color: #e23500;'>토마토</strong>도 꽁꽁 얼어붙을 듯한 날씨에요!";
        } else if (temperature >= -9 && temperature <= 10) {
            message = "<strong style='color: #e23500;'>토마토</strong>가 신선함을 유지하는 차가운 날씨!";
        } else if (temperature >= 10 && temperature <= 20) {
            message = "<strong style='color: #e23500;'>토마토</strong>가 탱글탱글한 맛을 더하는 날씨";
        } else if (temperature >= 20 && temperature <= 30) {
            message = "햇볕을 듬뿍 받은 <strong style='color: #e23500;'>토마토</strong>가 맛있게 익는 날씨!";
        } else if (temperature >= 31 && temperature <= 35) {
            message = "뜨거운 날씨에 더욱 빨갛게 익은 <strong style='color: #e23500;'>토마토</strong>!";
        } else if (temperature >= 36) {
            message = "<strong style='color: #e23500;'>토마토</strong>가 햇빛에 달아오르는 날!";
        }

        console.log("선택된 메시지:", message);

        // 메시지를 HTML로 삽입
        $(".weather-message-dynamic1").html(message);
    }

    // 이미지 업데이트 함수
    function updateTomatoImage(temperature, raintest) {
        let imgtoma;
        if (raintest > 0) {
            // 비가 오는 경우
            imgtoma = "tomato5.png";
        } else {
            // 비가 오지 않는 경우 온도에 따라 이미지 선택
            if (temperature >= -3 && temperature <= 10) {
                imgtoma = "tomato3.png"; // 10도 ~ 20도
            } else if (temperature >= 20 && temperature <= 30) {
                imgtoma = "tomato2.png"; // 20도 ~ 30도
            } else if (temperature >= 10 && temperature <= 20) {
                imgtoma = "tomato1.png"; // -3도 ~ 9도
            } else if (temperature <= -4 || temperature >= 31) {
                imgtoma = "tomato4.png"; // -4도 이하 또는 31도 이상
            }
        }

        console.log("선택된 이미지:", imgtoma);

        // 이미지 삽입
        $(".tomatoimg").html(`<img src='${imgtoma}' alt='Image' class='bounce-effect'>`);
    }

    // 지역 버튼 클릭 이벤트 핸들러
    $('#select-bucheon').click(function () {
        currentLat = 37.3217;
        currentLon = 126.8309; // 시흥 좌표
        updateWeatherInfo(currentLat, currentLon);
    });

    $('#select-suwon').click(function () {
        currentLat = 64.183;
        currentLon = -51.721; // NUUK 좌표
        updateWeatherInfo(currentLat, currentLon);
    });

    // 초기값 업데이트
    updateWeatherInfo(currentLat, currentLon);
});





//날짜 변경
$(document).ready(function () {
    // 팝업 열기
    $('#open-popup').click(function () {
        $('#location-popup').removeClass('hidden').fadeIn(); // hidden 클래스 제거하여 팝업 표시
    });

    // 팝업 닫기
    $('#close-popup, #location-popup').click(function (e) {
        if (e.target.id === 'close-popup' || e.target.id === 'location-popup') {
            $('#location-popup').fadeOut().addClass('hidden');
        }
    });

    // 지역 선택 클릭 이벤트
    $('#select-bucheon, #select-suwon').click(function () {
        const selectedLocation = $(this).text(); // 클릭한 지역 이름 가져오기
        $('#current-location').text(selectedLocation); // 'current-location'의 내용 업데이트
        $('#location-popup').fadeOut().addClass('hidden'); // 팝업 닫기
    });
});


$(document).ready(function () {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=37.3217&lon=126.8309&units=metric&appid=1da81b706d0af123d88a7ab18f8286db";

    // API 호출
    $.getJSON(apiUrl, function (data) {
        const test = data.main.temp; // 현재 온도
        const raintest = data.rain ? data.rain['1h'] : undefined; // 강수량 (1시간)

        console.log("현재 온도:", test);
        console.log("강수량 데이터:", raintest);
        $(document).ready(function () {
            const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=37.3217&lon=126.8309&units=metric&appid=1da81b706d0af123d88a7ab18f8286db';
        
            $.getJSON(apiUrl, function (data) {
                const raintest = data.rain ? data.rain['1h'] : 0; // 강수량 (1시간, mm)
        
                // 강수량 이미지 업데이트
                if (raintest > 0) {
                    // 비가 오는 경우
                    $('#rain-icon').attr('src', 'rain.png'); // 비 오는 이미지
                    $('#rain-text').text(`: ${raintest}mm`); // 강수량 표시
                } else {
                    // 비가 오지 않는 경우
                    $('#rain-icon').attr('src', 'no-rain.png'); // 비 오지 않는 이미지
                    $('#rain-text').text(': 비 없음'); // 강수량 표시 없음
                }
            }).fail(function () {
                // API 호출 실패 시 처리
                $('#rain-icon').attr('src', 'error.png'); // 에러 이미지
                $('#rain-text').text(': 데이터 없음');
            });
        });
        

        // 온도 및 강수량 기반 이미지와 텍스트 업데이트
        function updateDynamicWeatherImages(temperature) {
            console.log("업데이트할 테스트 온도:", temperature);

            let images = [];
            let descriptions = [];
            
            if (temperature <= -10) {
                images = ["-10_1.png", "-10_2.png"];
                descriptions = ["따듯한 토마토 수프", "오븐구이토마토 그라탱"];
            } else if (temperature >= -9 && temperature <= 0) {
                images = ["-9_1.png", "-9_2.png"];
                descriptions = ["토마토 크림 파스타", "구운 토마토 브루스케타"];
            } else if (temperature >= 1 && temperature <= 10) {
                images = ["0_1.png", "0_2.png"];
                descriptions = ["토마토 마리나라 파스타", "구운 토마토 샌드위치"];
            } else if (temperature >= 11 && temperature <= 20) {
                images = ["11_1.png", "11_2.png"];
                descriptions = ["토마토 그라탱", "허브 오븐 구이 토마토"];
            } else if (temperature >= 21 && temperature <= 30) {
                images = ["21_1.png", "21_2.png"];
                descriptions = ["구운 토마토와 스테이크", "토마토&버섯 라따뚜이"];
            } else if (temperature >= 31) {
                images = ["31_1.png", "31_2.png"];
                descriptions = ["시원한 토마토 가스파초", "토마토 주스"];
            }
            

            // 이미지와 텍스트 업데이트
            const imageContainer = $("#thi-content");
            imageContainer.empty(); // 기존 내용 제거
            images.forEach((imageSrc, index) => {
                const imgElement = `
                    <div class="weather-image-container-new">
                        <img src="${imageSrc}" alt="Weather Image" class="dynamic-weather-image-news">
                        <p class="weather-description-news">${descriptions[index]}</p>
                    </div>`;
                imageContainer.append(imgElement);
            });
            console.log("선택된 이미지들:", images); // 선택된 이미지 디버깅
        }

        // 이미지 업데이트 호출
        updateDynamicWeatherImages(test);
    }).fail(function () {
        console.error("API 데이터를 가져오지 못했습니다.");
    });
});

