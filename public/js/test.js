function getSelectedValues()
{
            var dropDown = document.getElementById('dd1'), countryArray = [], i;
            for (i = 0; i < dropDown.options.length ; i += 1) {
                if (dropDown.options[i].selected) {
                    //countryArray.push( dropDown.options[i].value); //If you need only values
                    countryArray.push({ Name: dropDown.options[i].text, Value: dropDown.options[i].value });
                }
            }
            console.log(countryArray);
            return false;
}
