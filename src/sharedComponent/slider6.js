import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    dots: true,
    // dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 4000,
    autoplaySpeed: 2000,
    arrows: false,

    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for desktop devices
        settings: {
          slidesToShow: 2, // Adjust as needed for desktop
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Breakpoint for tablets
        settings: {
          slidesToShow: 1.05, // Adjust as needed for tablets
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1.05, // Adjust as needed for mobile devices
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review1.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Xtended Space is the best for the short-term storage facility in
                Delhi and NCR even at the last minute. I will use them again and
                recommend Xtended Space to my friends.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Tanay+Pandya.webp"
                    alt="tanya"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Tanay Pandya <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Great customer service I must say- the drive-up car storage unit
                was easily accessible, and the prices are reasonable.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/AvineshSoni.webp"
                    alt="AvineshSoni"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Avinesh Soni <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review3.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Xtended Space provides me extra earning opportunities from my
                unused car parking space. Plus, it is always getting better. If
                Xtended Space didn’t exist. I’d probably not know what passive
                income means from the comfort of home.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Raghav+Ahuja.webp"
                    alt="Raghav"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Raghav Ahuja <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review4.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Great customer service I must say- the drive-up car storage unit
                was easily accessible, and the prices are reasonable.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/AvineshSoni.webp"
                    alt="AvineshSoni"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Avinesh Soni
                    <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review5.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                I have been hosting in Faridabad for the past two weeks now and
                it’s been a phenomenal experience. I’m confident that anyone
                from their vacant space earns passive income through Xtended
                Space.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Shubham+Bhaskar.webp"
                    alt="Shubham"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Shubham Bhaskar <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review1.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Such a stress-free experience. Xtended Space eased the stress of
                renting a safe furniture unit in Noida for me. I received my
                furniture in perfect condition after being stored for up to 15+
                days. Thank you Xtended Space for providing me brokerage-free
                storage space.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Nikita+Singh.webp"
                    alt="nikita"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Nikita Singh
                    <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="box1">
            <Image
              className="b1"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/review2.webp"
              alt="review"
              width={500}
              height={500}
            />
            <div className="box2 shadow">
              {/* <h2>I earned extra pocket money</h2> */}
              <p>
                Such a stress-free experience. Xtended Space staff eased the
                stress of renting a safe furniture storage unit in Noida for me.
                I received my furniture in perfect condition after stored for
                upto 15+ days. Thank you Xtended Space for providing me
                brokerage-free storage space.
              </p>
              <div className="box3">
                <div className="b2">
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Aakansha+Adhikari.webp"
                    alt="Aakansha"
                    width={100}
                    height={100}
                  />
                  <h3>
                    Aakansha Adhikari
                    <br />
                    {/* <span>Manager Director</span>  */}
                  </h3>
                </div>
                {/* <h4>4.6 </h4> */}
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
