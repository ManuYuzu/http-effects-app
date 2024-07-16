import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../../services/user.service";
import * as usersActions from "../actions";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUser$ = createEffect(
    () => this.actions$.pipe(
      ofType( usersActions.loadUser ),
      mergeMap(
        ({ id }) => this.userService.getUserById( id )
          .pipe(
            map( user => usersActions.loadUserSuccsess({ user }) ),
            catchError( error => of(usersActions.loadUserError({ payload: error })) )
          )
      )
    )
  );

}
