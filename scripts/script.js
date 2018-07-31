'use strict';

$(document).ready( () => {
    let tablesPerRow = 3;
    let tables = 9;
    //  Create Tables
    //  createTables(number)
    //  Will create a grid large enough
    //  To hold all the tables (number = number of tables)
    //  And populate the grid with tables

    const createTables = (number, tablesPerRow) => {
        let numRows = determineNumOfRows(number, tablesPerRow);

        let $currDiv;
        for(let i = 1; i <= number; i++) {
            if(i % tablesPerRow === 1) {
                // Then we need a new div to hold the
                // next few tables
                $currDiv = $('.tables').append(`<div></div>`).children('div:last-child');
            }
            $currDiv.append(`<button class='table available'>${i}</button>`);
        }

        buildTablesContainer(tablesPerRow, numRows);
    }

    //  Determine Number of Rows
    //  determineNumOfRows(number)
    //  Determines how many rows will be needed
    //  to hold all the tables
    //  should return a number of rows to create

    //  tables per row is currently being set here

    const determineNumOfRows = (number, tablesPerRow) => {
        // Determine the number of rows we need
        let rows = Math.floor(number / tablesPerRow);
        if(number % tablesPerRow !== 0) {
            rows++;
        }
        return rows;
    }

    // We'll get the button for the table passed in
    // Take the text from that to set the form's
    // Current Table label, and show the form
    const openForm = (clickedTable) => {
        // Show the form
        let $form = $('form');
        $form.show();
        $('form h3').text(`Table Number: ${clickedTable.text()}`);
        $('form').attr('table', `${clickedTable.text()}`);
    }

    const hideForm = () => {
        let $form = $('form');
        $form.hide();
    }

    const submitForm = () => {
        let $form = $('form');

        // Need to get the table with a text matching the form's table attribute
        // And remove the available class and add the reserved class
        let $tables = $('.table');
        let $table;
        for(let i = 0; i < $tables.length; i++) {
            if($tables.eq(i).text() == $form.attr('table')) {
                $table = $tables.eq(i);
            } 
        }
        if($table){
            setReserved($table);
        }
        clearForm();
        hideForm();
    }

    const setReserved = ($table) => {
        $table.removeClass('available');
        $table.removeClass('hover');
        $table.addClass('reserved');
    }

    const clearForm = () => {
        $('form input').val('');
    }

    const buildTablesContainer = (tablesPerRow, numRows) => {
        let buttonWidth = $('.tables .table').eq(0).width();
        let spacingMultiplier;
        if (buttonWidth < 60) {
            spacingMultiplier = 2;
        }
        else if (buttonWidth < 90) {
            spacingMultiplier = 2.2;
        }
        else if (buttonWidth < 150) {
            spacingMultiplier = 3;
        }
        // $('.tables').width(buttonWidth * tablesPerRow * spacingMultiplier);
        // $('.tables').height(buttonWidth * numRows * spacingMultiplier);
    }



    $('body').on('click', '.table.available', (e)=> {
        let $clickedTable = $(e.target);
        openForm($clickedTable);
    });

    $('body').on('click', 'form button', (e) => {
        let $clickedButton = $(e.target);
        if($clickedButton.text() === 'X') {
            hideForm();
        } else if ($clickedButton.text() === 'SAVE') {
            submitForm();
        }
    });

    $('body').on('mouseenter mouseleave', '.table.available', (e) => {
        $(e.target).toggleClass('hover');
    });

    $('.reserved').css('cursor', 'not-allowed');
    $('.available').css('cursor', 'pointer');

    hideForm();
    $(window).on('resize', (e) => {
        buildTablesContainer(tables, determineNumOfRows(tables, tablesPerRow));
    });


    hideForm();
    createTables(tables, tablesPerRow);

});

