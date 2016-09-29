<!-- Portfolio section -->
<section id="portfolio" class="padding text-center">
    <div class="section-heading" data-animate="bounceIn">Portfolio</div>
</section>
<div class="container">
    <div class="text-center">
        <ul class="portfolio-filter padding-normal-bottom">
            <li class="active" data-animate="fadeInUp" data-delay="300*index" data-group="1"><a href="#" class="button button-small" data-target="#portfolio1" data-filter="*">All</a></li>
            <li data-animate="fadeInUp" data-delay="300*index" data-group="1"><a href="#" class="button button-small" data-target="#portfolio1" data-filter=".category-photography">Photography</a></li>
            <li data-animate="fadeInUp" data-delay="300*index" data-group="1"><a href="#" class="button button-small" data-target="#portfolio1" data-filter=".category-design">Design</a></li>
            <li data-animate="fadeInUp" data-delay="300*index" data-group="1"><a href="#" class="button button-small" data-target="#portfolio1" data-filter=".category-print">Print</a></li>
            <li data-animate="fadeInUp" data-delay="300*index" data-group="1"><a href="#" class="button button-small" data-target="#portfolio1" data-filter=".category-video">Video</a></li>
        </ul>
    </div>
    <div id="portfolio1" class="portfolio padding-half-bottom" data-portfolio-url="portfolio-items.json" data-portfolio-template='<div class="item category-{{category}}"><img src="{{image}}" class="image" alt="" /><div class="overlay"><div class="tile"></div><a href="{{url}}" class="link"><span class="title">{{title}}</span><span class="category">{{categoryTitle}}</span></a></div></div>'></div>
    <div class="text-center padding-minus-bottom">
        <a href="#" class="button button-icon-left" data-animate="flipInY" data-portfolio-loadmore="#portfolio1"><i class="fa fa-refresh"></i>Load more</a>
    </div>
</div>