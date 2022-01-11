$(document).ready(function() {

    var today;
	var keyword;
	var startDate;
	var endDate;
	var request;
	var api1 = 'b3cb1a1630d09bcdd5b6a876c4d09a0c';
	var api2 = 'd88baa290ed3e8ff647a24f1bf47d9b4';

    loadHeadlines();

    $('.congnghe').click(function(){loadTopic('technology');});
    $('.sucKhoe').click(function(){loadTopic('health');});
    $('.yTe').click(function(){loadTopic('medican')});
    $('.theThao').click(function(){loadTopic('sports');});
    $('.kinhTe').click(function(){loadTopic('business');});
    $('.tinMoi').click(function(){loadTopic('top-news');});

    function loadHeadlines(){
		$(".loading").show();
		fetch('https://gnews.io/api/v4/top-headlines?token='+ api1 + '&lang=en') //Fetch the news from API
		.then(function (response) {
			return response.json();
		})
		.then(function(data){
			tinNoiBat(data);
		})
		.then(function(){
			$(".loading").hide();
		});
	}
	//Load a given topic
	function loadTopic(topic){
		$(".loading").show();
		fetch('https://gnews.io/api/v4/top-headlines?topic=' + topic + '&token=' + api1 + '&lang=en')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) { //Read the articles and parse data to HTML
			tinNoiBat(data);
		})
		.then(function(){
			$(".loading").hide();
		});
	}

    //Show a datepicker
	today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	$('#startDate').datepicker({
		uiLibrary: 'bootstrap4',
		iconsLibrary: 'fontawesome',
		maxDate: function () {
			return $('#endDate').val();
		}
	});
	$('#endDate').datepicker({
		uiLibrary: 'bootstrap4',
		iconsLibrary: 'fontawesome',
		maxDate: today,
		minDate: function () {
			return $('#startDate').val();
		}
	});
	$('#search-button').click(function(){                      // Tìm kiếm
		keyword = $('#search-param').val();
		if (keyword != ''){
			request = 'https://gnews.io/api/v4/search?q=' + keyword + '&token='+ api2 +'&lang=en';
			$(".loading").show();
			fetch(request)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				tinNoiBat(data);
			})
			.then(function(){
				$(".loading").hide();
			});
		}
	});
	$('#advanced-search-button').click(function(){                     // Tìm kiếm nâng cao
		keyword = $('#search-param1').val();
		startDate = new Date($('#startDate').val()).toISOString();
		endDate = new Date($('#endDate').val()).toISOString();
		if (keyword != '' && startDate != '' && endDate != ''){
			request = 'https://gnews.io/api/v4/search?q=' + keyword + '&from=' + startDate + '&to=' + endDate + '&token='+ api2 +'&lang=en';
			console.log(request);
			$(".loading").show();
			fetch(request)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				tinNoiBat(data);
				console.log(data);
			})
			.then(function(){
				$(".loading").hide();
			});
		}
	});






    function tinNoiBat(data){                                     // Hàm để lấy thông tin từ API hiển thị lên HTML
		$(".news-0 img").attr("src", data.articles[0].image);
		$(".news-0 a.headline").attr("href", data.articles[0].url);
		$(".news-0 a.read-more").attr("href", data.articles[0].url);
		$(".news-0 .headline h5").text(data.articles[0].title);
		$(".news-0 p.summary").text(data.articles[0].description);
		$(".news-0 .author").text(data.articles[0].source.name);
		$(".news-0 .date").text(moment(data.articles[0].publishedAt).format("DD-MM"));
		$(".news").html('');                                       // Div trống để hiển thị các bài viết
		for (let i = 1; i < Math.min(9, data.totalArticles); i++){
			$(".news").append('<article class = "news-' + i + ' card col-sm-3"><div class = "col-12"><img src = "' + data.articles[i].image + 
            '" class = "img-fluid"></div><div class = "col-12 text"><a href = "' + data.articles[i].url + ' " class = "headline" target="_blank"><h5>'
             + data.articles[i].title + '</h5></a><p class = "source">Đăng bởi <span class = "author">' + data.articles[i].source.name + '</span> vào <span class = "date">' 
             + moment(data.articles[i].publishedAt).format("DD-MM") + '</span></p><p class = "summary">' + data.articles[i].description + '</p><div class = "link"><a href = "'
              + data.articles[i].url + '" class = "read-more" target="_blank">Đọc tiếp</a></div></div></article>');
		}	
	}
	










})