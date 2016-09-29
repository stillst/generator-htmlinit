<!-- Contacts section -->
<section id="contacts" class="padding-bottom text-center">
    <div class="section-heading" data-animate="bounceIn">Contacts</div>
</section>
<div class="container">
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 padding-minus-bottom">
            <iframe class="map" src="http://maps.google.com/maps?f=q&source=s_q&hl=en&q=Adobe%20Systems%20Inc%2C%20Park%20Avenue%2C%20San%20Jose%2C%20CA&aq=0&ie=UTF8&t=m&z=12&iwloc=&output=embed"></iframe>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 padding-minus-bottom">
            <form action="./contact.php" method="post" target="hidden">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="name" data-animate="fadeInRight">Name:</label>
                        <input type="text" id="name" name="name" data-animate="fadeInRight" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="email" data-animate="fadeInRight">E-mail:</label>
                        <input type="text" id="email" name="email" data-animate="fadeInRight" />
                    </div>
                </div>
                <label for="message" data-animate="fadeInRight">Message:</label>
                <textarea id="message" name="message" data-animate="fadeInRight"></textarea>
                <button type="submit" class="button button-icon-left" data-animate="flipInY"><i class="fa fa-envelope"></i>Send message</button>
            </form>
        </div>
    </div>
</div>