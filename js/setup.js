
      // Initialize impress.js
      var api = impress();
      api.init();

      // This little thing enables the use of the mouse wheen to scroll
      //through the slides
      document.addEventListener("mousewheel", function(event){
        if(event.wheelDelta > 0){
          api.prev();
        }
        else{
          api.next();
        }
      },false);

      document.addEventListener("keydown", function(event){
        // Go to the overview slide when pressing the escape key
        if(event.keyCode === 27 /* value of esc*/){
          api.goto("overview")
        }
      });

