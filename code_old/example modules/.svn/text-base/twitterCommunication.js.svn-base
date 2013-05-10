;(function (doc, win, $, _undefined_) {
    "use strict";

    /**
     * This module manages the communication with the twitter API and shows the results the results
     * in the DOM. For the future it might be a better approach to split it in two different modules.
     * One just for the API communication and other just for display the information in the DOM.
     * This module waits to the event 'geolocation_success' to run.
     */
    Core.register("twitterComunication", function (box) {

        var aAjaxTwitterResponse = [];

        /**
         * This function displays an waiting animation while the AJAX request is in progress.
         */
        function loadingAnimation() {
            var oHTMLAnimation, oHTMLTarget;

            oHTMLAnimation = doc.createElement("img");
            oHTMLAnimation.alt = "activity indicator";
            oHTMLAnimation.src = "img/ajax-loader2.gif";
            oHTMLAnimation.id = "loading";

            oHTMLTarget = doc.getElementById("ajax-content");
            oHTMLTarget.removeChild(oHTMLTarget.firstChild);
            oHTMLTarget.appendChild(oHTMLAnimation);
        }

        /**
         * Parses the input JSON from twiter and creates a simpler JSON for the application.
         * @param  {JSON} oJSON The complex JSON from twitter.
         * @return {JSON}       The simpler JSON.
         */
        function parseTweetElement(oJSON) {
            var sUser = oJSON.from_user_name,
                sAvatar = oJSON.profile_image_url,
                sText = oJSON.text,
                date = new Date(oJSON.created_at);

            return {
                "sUserName": sUser,
                "sUserLink": sAvatar,
                "sAvatar": sAvatar,
                "sText": sText,
                "sDate": date.toDateString()
            };
        }

        /**
         * Generates the HTML elements for one tweet and add it into the HTML object oHTMLReference.
         * @param  {Object} oHTMLReference The HTML object where the new HTML is added into.
         * @param  {Object} oCurrentTweet  The simpler JSON from a tweet.
         */
        function generateCurrentTweet(oHTMLReference, oCurrentTweet) {

            var oHTMLAvatar, oHTMLText, oHTMLTextContent, oHTMLAuthor,
                oHTMLAuthorContent, oHTMLDate, oHTMLDateContent;

            oHTMLAvatar = doc.createElement("img");
            oHTMLAvatar.src = oCurrentTweet.sAvatar;
            oHTMLAvatar.className = "avatar";
            oHTMLReference.appendChild(oHTMLAvatar);

            oHTMLAuthor = doc.createElement("a");
            oHTMLAuthorContent = doc.createTextNode(oCurrentTweet.sUserName);
            oHTMLAuthor.appendChild(oHTMLAuthorContent);
            oHTMLAuthor.href = oCurrentTweet.sUserLink;
            oHTMLAuthor.className = "user";
            oHTMLReference.appendChild(oHTMLAuthor);

            oHTMLText = doc.createElement("p");
            oHTMLTextContent = doc.createTextNode(oCurrentTweet.sText);
            oHTMLText.appendChild(oHTMLTextContent);
            oHTMLText.className = "message";
            oHTMLReference.appendChild(oHTMLText);

            oHTMLDate = doc.createElement("time");
            oHTMLDateContent = doc.createTextNode(oCurrentTweet.sDate);
            oHTMLDate.appendChild(oHTMLDateContent);
            oHTMLDate.className = "time";
            oHTMLReference.appendChild(oHTMLDate);
        }

       /**
         * Shows the tweets that where obtained by ajax into the HTML.
         */
        function showTweets() {
            var sElementId = "ajax-content",
                aJSON = aAjaxTwitterResponse,
                nLength = aJSON.length,
                i,
                oCommit,
                oAuthor,
                oCurrentTweet,
                oHTMLContainer,
                oHTMLList,
                oHTMLListElement,
                oHTMLTarget;

            oHTMLContainer = doc.createElement("section");
            oHTMLContainer.id = "twitter";
            oHTMLList = doc.createElement("ol");
            for (i = 0; i < nLength; i += 1) {
                oCurrentTweet = parseTweetElement(aJSON[i]);
                oHTMLListElement = doc.createElement("li");
                generateCurrentTweet(oHTMLListElement, oCurrentTweet);
                oHTMLList.appendChild(oHTMLListElement);
            }
            oHTMLContainer.appendChild(oHTMLList);
            oHTMLTarget = doc.getElementById(sElementId);
            oHTMLTarget.removeChild(oHTMLTarget.firstChild);
            oHTMLTarget.appendChild(oHTMLContainer);
        }

        /**
         * This function does the AJAX call. For the future a better approach will be to have a
         * own ajaxRequest function in the box Sandbox in order to not depend on an external
         * library.
         * @param  {Object} oCoordinates The object with the user coordinates.
         */
        function ajaxTwitterRequest(oCoordinates) {
            loadingAnimation();
            $.ajax({
                url : 'http://search.twitter.com/search.json?q=&geocode=' + oCoordinates.latitude +
                    ',' + oCoordinates.longitude + ',1km&rpp=100',
                dataType : 'jsonp',
                callbackName: 'myCallback',
                success: function (data) {
                    aAjaxTwitterResponse = data.results;
                    showTweets();
                }
            });
        }

        return {
            init: function () {
                box.subscribe("geolocation_status", "success", ajaxTwitterRequest);
            }
        };
    });
}(document, window, jQuery));