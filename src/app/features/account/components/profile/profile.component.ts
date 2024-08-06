import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { IUserProfile } from '../../models/userprofile';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [TranslateModule],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  userProfile: WritableSignal<IUserProfile | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  errorMessage: WritableSignal<string | null> = signal(null);

  constructor(private profileService: ProfileService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile.set(profile);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(this.translate.instant('PROFILE_LOAD_ERROR'));
        this.loading.set(false);
        console.error('Error loading profile:', error);
      }
    });
  }
}
