document.addEventListener("DOMContentLoaded", function () {
        var downloadCvBtn = document.getElementById("downloadCvBtn");

        if (downloadCvBtn) {
          downloadCvBtn.addEventListener("click", function (e) {
            var fileId = "1H6ertVxG8dX11VpsEBu4s77U_lqg2AXY";
            var downloadUrl =
              "https://drive.google.com/uc?export=download&id=" + fileId;
            var a = document.createElement("a");
            a.href = downloadUrl;
            a.target = "_blank";
            a.download = "Kunal-Kavathekar-Resume.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
        }
      });