//COUNTER
var counter = document.getElementById("numbers");

if (counter != null){
    var options = {
      useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''
    };

    var exp = new CountUp('js-numbers__number--exp', 0, 3, 0, 5, options);
    var spec = new CountUp('js-numbers__number--spec', 0, 5, 0, 5, options);
    var ref = new CountUp('js-numbers__number--ref', 0, 700, 0, 3, options);
    var rate = new CountUp('js-numbers__number--rate', 0, 800, 0, 3, options);


    jQuery(document).on("scroll", function() {
        var distance = jQuery('.numbers').offset().top - jQuery(document).scrollTop();
        if (distance < 650 ){
            exp.start();
            spec.start();
            ref.start();
            rate.start();
        }
    });
}



//FAQ
jQuery(document).on('click', '.faq__q span', function()
{
    console.log('locve');
    var btn = jQuery(this);
    var question = btn.parent();
    var answer = question.next();
    question.toggleClass('faq__q--open');
    if (question.hasClass('faq__q--open')){
        btn.text('Закрыть ответ');
    }
    else{
        btn.text('Посмотреть ответ');
    }
    answer.slideToggle();
});


//Popup-form
jQuery(document).on('click', '#js-popup-form__close', function()
{
    jQuery('#js-popup-form').slideToggle();
});

jQuery(document).on('click', '.js-open-popup', function()
{
    jQuery('#js-popup-form').slideToggle();
});

jQuery(document).on('click', '#js-popup-form', function()
{
   if (jQuery('#js-popup-form form:hover').length == 0){
       jQuery("#js-popup-form").slideToggle();
   }
});

var galery = document.getElementById("galery");
if (galery != null){

    jQuery('.galery').magnificPopup({
          delegate: 'a',
          type: 'image',
          gallery: {
                enabled: true
          }
});
}