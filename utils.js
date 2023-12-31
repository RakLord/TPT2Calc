
function createDropdown(data) {
    let div = $("<div>").addClass("select-container");
    let select = $("<select>").addClass("select-box input-box");

    data.forEach((name, index)=> {
        select.append($("<option>").attr("value", index).text(name));
    })

    div.append(select);

    return div;
}

function newInput(title, dropdown=false) {
    let div = $("<div>").addClass("flow");
    let titleTag = $("<h3>").text(title);
    if (!dropdown) {
      let inputTag = $("<input>").attr("placeholder", "0").addClass("input-box");
      div.append(titleTag, inputTag);
    }
    else {
      let dropdownInput = createDropdown(dropdown);
      div.append(titleTag, dropdownInput);
    }
    return div;
  }