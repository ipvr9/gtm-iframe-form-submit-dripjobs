(function() {
    function IframeFormSubmitDataLayer() {
        var iframeSelector = 'iframe'; // change this as your iframe selector
        var iframe = document.querySelector(iframeSelector);
        var isInsideIframe = false;
        var isCodeExecuted = false;
        var submissionDetected = false;
        var checkInterval;

        function handleMouseOver(event) {
            if (event.target.closest(iframeSelector)) {
                isInsideIframe = true;
            } else {
                isInsideIframe = false;
            }
        }

        function detectSubmission(reason) {
            if (!submissionDetected) {
                submissionDetected = true;
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                    event: 'iframe_form_submit',
                    form_location: window.location.href,
                    iframe_id: iframe.getAttribute('id'),
                    iframe_class: iframe.getAttribute('class'),
                    detection_method: reason
                });
                console.log('Form submission detected:', reason);
                clearInterval(checkInterval);
            }
        }

        function checkIframePresence() {
            if (!document.body.contains(iframe)) {
                detectSubmission('iframe removed');
            }
        }

        // Set up MutationObserver
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes') {
                    detectSubmission('iframe attributes changed');
                }
            });
        });

        function startTracking() {
            // Start observing the iframe
            observer.observe(iframe, { attributes: true, attributeFilter: ['style', 'class'] });

            // Start periodic checks
            checkInterval = setInterval(checkIframePresence, 1000);

            // Listen for page unload
            window.addEventListener('beforeunload', function() {
                detectSubmission('page unload');
            });
        }

        document.addEventListener('mouseover', handleMouseOver);

        window.addEventListener('blur', function () {
            if (isInsideIframe && !isCodeExecuted) {
                isCodeExecuted = true;
                document.removeEventListener('mouseover', handleMouseOver);

                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                    event: 'iframe_form_start',
                    form_location: window.location.href,
                    iframe_id: iframe.getAttribute('id'),
                    iframe_class: iframe.getAttribute('class')
                });

                startTracking();
            }
        });

        // Initial check when the script loads
        if (document.activeElement === iframe) {
            isInsideIframe = true;
            isCodeExecuted = true;
            
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                event: 'iframe_form_start',
                form_location: window.location.href,
                iframe_id: iframe.getAttribute('id'),
                iframe_class: iframe.getAttribute('class')
            });

            startTracking();
        }
    }
    IframeFormSubmitDataLayer();
})();
