/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test suite to check feeds
    describe('RSS Feeds', function() {
        // It tests to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that loops through each feed in the allFeeds object and ensures it has a URL defined and not empty.
         it('have URL defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


        // Test that loops through each feed in the allFeeds object and ensures it has a name defined and is not empty.
         it('have name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    // Test suite to check menu

    describe('The menu', function() {

        // Test that ensures the menu element is hidden by default.
         it('element is hidden by default', function() {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
         });

         // Test that ensures the menu changes visibility when the menu icon is clicked.
          //Code by: https://medium.com/letsboot/testing-javascript-with-jasmine-basics-48efe03cf973
          it('toggles when icon clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains('menu-hidden')).toEqual(false);
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList.contains('menu-hidden')).toEqual(true);
          });

    });

    // Test suite to check "Initial Entries"

    describe('Initial Entries', function() {

        // Test that ensures when the loadFeed function is called and completes its work, 
        // there is at least a single .entry element within the .feed container.
         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });

        // It checks parent child relationship
         it('exist in feed container', function(){
            expect(document.querySelector('.feed .entry')).toBeDefined();
         });

    });

    // Test suite to check "New Feed Selection"

    describe('New Feed Selection', function(){

        // Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.

         var firstFeed;
         var secondFeed;

         beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = document.querySelector('.feed').innerHTML;
                done();
            });
            loadFeed(1, function(){
                secondFeed = document.querySelector('.feed').innerHTML;
                done();
            });
         });

         it('has different content', function(){
            expect(firstFeed != secondFeed).toBe(true);   
         });
         
    });

}());