(function(){
    var serverHost = urlShortener.config.serverHost;

    function getShortenedUrl() {
        var longUrl = document.getElementById("longurl").value;
        var customAlias = document.getElementById("alias").value;

        if (!longUrl) {
            setStatus("Enter Url.");
            return;
        }

        setStatus("Shortening url..");

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", serverHost + "/api/url", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState < 4) {
                return;
            }

            if (xmlhttp.status == 409) {
                setStatus("Alias already exists. Please try another one.");
                return;
            }

            if (xmlhttp.status != 200) {
                setStatus("Internal server error. Please try again later.");
                return;
            }

            var obj = JSON.parse(xmlhttp.response);
            setShortUrl(serverHost + "/" + obj.id);

        };

        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({longUrl:longUrl, id: customAlias}));
    }

    function setStatus(status) {
        document.getElementById("shorturl").value = status;
    }

    function setShortUrl(shortUrl) {
        document.getElementById("shorturl").value = shortUrl;
    }

    document.getElementById("submit").addEventListener("click", function (e) {
        if (e.stopPropagation) {
            getShortenedUrl();
            e.preventDefault();
            e.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;
        }
    });
})();
