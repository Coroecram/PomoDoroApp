<div class="page-header">
  <h1>Sign Up</h1>
</div>

<form ng-submit="signup()">
  <div class="input-group">
    <input type="email" class="form-control" placeholder="Email" ng-model="user.email">
  </div>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Username" ng-model="user.username">
  </div>
  <div class="input-group">
    <input type="password" class="form-control" placeholder="Password" ng-model="user.password">
  </div>
  <input type="submit" class="btn btn-default" value="Register">
</form>
