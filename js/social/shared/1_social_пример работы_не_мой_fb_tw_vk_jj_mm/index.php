<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<?$pageUri = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];
$pageTitle = 'Кастомные социальные кнопки';?>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Кастомные социальные кнопки</title>
        <meta property="og:title" content="Кастомные социальные кнопки"/>
        <meta property="og:description" content="Недавно участвовал в разработке одного проекта — фото конкурса. По задумке, рейтинг фото альбомов должен формироваться из суммы всех публикаций в социальных сетях: Facebook, Вконтакте, Twitter."/>
        <meta property="og:image" content="<?=$pageUri?>images/img1.jpg"/>
        <meta name="title" content="Кастомные социальные кнопки" />
        <meta name="description" content="Недавно участвовал в разработке одного проекта — фото конкурса. По задумке, рейтинг фото альбомов должен формироваться из суммы всех публикаций в социальных сетях: Facebook, Вконтакте, Twitter." />
        <link rel="image_src" href="<?=$pageUri?>images/img1.jpg" />
        <link href="css/style.css" type="text/css" rel="stylesheet"/>
        <script src="js/jquery-1.5.2.min.js" type="text/javascript"></script>
        <script src="js/script.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="container">
            <script type="text/javascript">
                from_page = {pageuri : '<?=$pageUri?>'}
            </script>
            <h1>Кастомные социальные кнопки</h1>
            <div class="left">
                    <p>Недавно участвовал в разработке одного проекта — фото конкурса. По задумке, рейтинг фото альбомов должен формироваться из суммы всех публикаций в социальных сетях: Facebook, Вконтакте, Twitter. Т.е. общий рейтинг фотоальбома расчитывается:</p>
                    <p><blockqoute>Рейтинг фотоальбома = кол-во «Share» в Facebook + кол-во «Сохранить» в Вконтакте + кол-во «Retweet» в Twitter</blockqoute></p>
                    <p>На макетах, вид кнопок несколько отличался от предоставляемых социальными сетями плагинов, формируемых функциями api. В частности вид счетчиков:</p>
                    <p><img alt="image" src="images/img1.jpg"/></p>
                    <p>Помимо несоответствий с дизайном, каждый плагин формирует излишний хтмл код, а хотелось бы лаконичный.</p>
                    <p>Детальнее ознакомившись с api каждой сети, окончательно убедились в отсутствии расширенных возможностей для кастомизации кнопок и этот факт понять можно, все стремятся к единоборазности своих кнопок. Решили отказаться от использования готовых плагинов и сделать свои кнопки.</p>
                    <p>Итак:</p>
                    <ul>
                        <li>количество лайков будем получать от REST сервисов каждой социалки</li>
                        <li>кнопки рисуем свои и обрабатываем событие click</li>
                    </ul>
                    <p><a href="http://habrahabr.ru/blogs/social_networks/116584/">Читать далее</a></p>
            </div>
            <div class="right">
                    <div id="social_block">
                            <div id="vk_sharer">
                                <span>0</span>
                                <a id="vk_btn" href="http://vkontakte.ru/share.php?url=<?=urlencode($pageUri)?>" target="_blank" title="Сохранить Вконтакте">Сохранить</a>
                            </div>
                            <div id="fb_sharer">
                                <span>0</span>
                                <a id="fb_btn" href="http://www.facebook.com/sharer.php?u=<?=urlencode($pageUri)?>&t=<?=urlencode($pageTitle)?>&src=sp" target="_blank" title="Мне нравится">Нравится</a>
                            </div>
                            <div id="tw_sharer">
                                <span>0</span>
                                <a id="tw_btn" href="http://twitter.com/share?url=<?=urlencode($pageUri)?>&text=<?=urlencode($pageTitle)?>" target="_blank" title="Retweet">Retweet</a>
                            </div>
                            <hr/>
                            <div id="total_count">0</div>
                    </div>
            </div>
        </div>
    </body>
</html>
