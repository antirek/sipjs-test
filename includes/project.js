var Phone = null;

$(function () {

    $("#call").on('click', function (e) {
        Phone.call($("#number").val());
    });

    $("#end").on('click', function (e) {
        Phone.end();
    });

    $("#saveSettings").on('click', function () {
        console.log('save!');
        $.jStorage.set('uri', $('#uri').val());
        $.jStorage.set('name', $('#name').val());
        $.jStorage.set('password', $('#password').val());
        $.jStorage.set('authName', $('#authName').val());
        $.jStorage.set('wsServer', $('#wsServer').val());

        $('#myModal').modal('hide');
        initPhone();      
    });
    
    function initFromStorage () {
        $("#uri").val($.jStorage.get('uri'));
        $("#name").val($.jStorage.get('name'));
        $("#password").val($.jStorage.get('password'));
        $("#authName").val($.jStorage.get('authName'));
        $("#wsServer").val($.jStorage.get('wsServer'));

        return {
            uri: $.jStorage.get('uri'),
            name: $.jStorage.get('name'),
            password: $.jStorage.get('password'),
            authName: $.jStorage.get('authName'),
            wsServer: $.jStorage.get('wsServer')
        };        
    };

    function checkEmpty (param) {
        return param === '';
    };

    function checkParams (creds) {
        return checkEmpty(creds.uri) && 
               checkEmpty(creds.name) && 
               checkEmpty(creds.password) && 
               checkEmpty(creds.authName) &&
               checkEmpty(creds.wsServer);
    };

    function initPhone () {
        var creds = initFromStorage();
        console.log(creds);

        if (!checkParams(creds)) { 
            var config = {
                uri: creds.uri,
                transportOptions: {
                    wsServers: creds.wsServer,
                },
                authorizationUser: creds.authName,
                password: creds.password,
                // hackIpInContact: true,
                register: true,
                log: {
                    builtinEnabled: true,
                },
                autostart: true,
                displayName: creds.name,
                hackIpInContact: true,
                hackViaTcp: false,
                hackWssInTransport: false,
                sessionDescriptionHandlerFactoryOptions: {
                    constraints: {
                        audio: true,
                        video: false
                      }
                }
            };

            Phone = new phone();
            Phone.init(config);
        } else {
            console.log('not set config params');
        }
        
    };
    
    initPhone();
});
