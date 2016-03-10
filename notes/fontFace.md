###自制网络字体###

    1. 先从[Dafont](http://www.dafont.com)获取免费字体
    2. 通过[fontsquirrel](http://www.fontsquirrel.com/tools/webfont-generator)在线制作所需字体文件
    3. 在css文件中定义字体
    
        @font-face {
            font-family: 'fontname';
            src: url('./font/fontname.eot');
            src: url('./font/fontname.svg') format('svg'),
                 url('./font/fontname.ttf') format('truetype'),
                 url('./font/fontname.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
        
     4. 在选择符中使用该字体
     
         div.font-test {
             font-family: 'fontname';
         }