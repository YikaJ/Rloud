/**
 * Created by YikaJ on 15/12/7.
 */
'use strict';

exports.getUser = function(req, res, next){
  res.json({code: 1, data: {user: req.session.user}})
}