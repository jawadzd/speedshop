import { Component, OnInit, Signal, signal, effect ,WritableSignal} from '@angular/core';
import { ProfileService} from '../../services/profile.service';
import { IUserProfile } from '../../models/userprofile';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService] // Provide the service here
})
export class ProfileComponent implements OnInit {
  userProfile: WritableSignal<IUserProfile | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  errorMessage: WritableSignal<string | null> = signal(null);

  constructor(private profileService: ProfileService) {}

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
        this.errorMessage.set('Failed to load user profile');
        this.loading.set(false);
        console.error('Error loading profile:', error);
      }
    });
  }
}
