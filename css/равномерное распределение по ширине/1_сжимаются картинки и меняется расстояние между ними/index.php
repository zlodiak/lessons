<html>
  <head>
        <title>Выравнивание</title>
        <style>
        .container {
          width: 60%;
          margin: 0 auto;
          border: 1px solid green;
        }
        .img1, .img2 {
          width: 50px;
          height: 50px;
          border: 1px solid blue;
          float: right;
        }
        .img1 {
          float: left;
        }
        .wrap {
          margin-left: 52px;
        }
        .wr {
          width: 25%;
          float: left;
        }
        .clear {
          clear: both;
        }
        </style>
  </head>
  <body>
        <div class="container">
          <div class="img1"></div>
          <div class="wrap">
                <div class="wr">
                  <div class="img2"><img src="button_phone.png"></div>
                </div>
                <div class="wr">
                  <div class="img2"><img src="button_phone.png"></div>
                </div>
                <div class="wr">
                  <div class="img2"><img src="button_phone.png"></div>
                </div>
                <div class="wr">
                  <div class="img2"><img src="button_phone.png"></div>
                </div>
          </div>
          <div class="clear"></div>
        </div>
  </body>
</html>