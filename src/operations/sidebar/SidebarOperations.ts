import { SidebarAlertType } from '@/domain/entities/sidebar/SidebarAlertType';
import { SidebarMapType } from '@/domain/entities/sidebar/SidebarMapType';
import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

export class SidebarOperations {
  public static getSidebarMapTypes(): SidebarMapType[] {
    return [
      {
        key: GlobalInsight.FOOD,
        label: 'Food consumption',
        icon: '/menu_fcs.png',
      },
      {
        key: GlobalInsight.NUTRITION,
        label: 'Nutrition',
        icon: '/menu_nutri.png',
      },
      {
        key: GlobalInsight.VEGETATION,
        label: 'Vegetation',
        icon: '/menu_ndvi.png',
      },
      {
        key: GlobalInsight.RAINFALL,
        label: 'Rainfall',
        icon: '/menu_rainfall.png',
      },
      {
        key: GlobalInsight.IPC,
        label: 'IPC/CH',
        icon: '/menu_ipc.png',
      },
    ];
  }

  static sidebarAlertTypes: SidebarAlertType[] = [
    {
      key: AlertType.HUNGER,
      label: 'Hunger Alert',
      icon: '/menu_fcs.png',
    },
    {
      key: AlertType.CONFLICTS,
      label: 'Conflicts',
      icon: '/menu_conflicts.png',
      subalerts: [
        {
          key: AlertType.CONFLICT1,
          label: 'Conflicts 1',
          icon: '/menu_conflicts.png',
        },
        {
          key: AlertType.CONFLICT2,
          label: 'Conflicts 2',
          icon: '/menu_conflicts.png',
        },
      ],
    },
    {
      key: AlertType.HAZARDS,
      label: 'Hazards',
      icon: '/menu_hazards.png',
    },
  ];

  public static getSidebarAlertTypes(): SidebarAlertType[] {
    return SidebarOperations.sidebarAlertTypes;
  }

  public static getSidebarAlertTypeByKey(key: AlertType): SidebarAlertType | undefined {
    return SidebarOperations.sidebarAlertTypes.find((alert) => alert.key === key);
  }

  public static hasSubalerts(item: SidebarAlertType): item is SidebarAlertType & { subalerts: SidebarAlertType[] } {
    return 'subalerts' in item;
  }
}