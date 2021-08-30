function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    };
    return text.replace(/[&<>"]/g, function(m) { return map[m]; });
  }

  function validationEmail(email) {
    let regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    let found = email.match(regex);
    if(found != null) {
        return email;
    } else {
        return null;
    }
  }

function validationText(text) {
    let regex = /([^\r]+)/g;
    let found = text.match(regex);
    if(found != null) {
        return text;
    } else {
        return null;
    }
}

function validationPassword(password) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let found = password.match(regex);
    if(found != null) {
        return password;
    } else {
        return null;
    }
}

export {escapeHtml, validationEmail, validationText, validationPassword};
