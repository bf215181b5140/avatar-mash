import { DataSource } from 'typeorm';
import { syncDatabaseData } from './database.data';

export class DatabaseService extends DataSource {

  constructor() {
    super({
      type: 'mysql',
      host: process.env.DB_HOST || '',
      port: Number(process.env.DB_PORT) || 0,
      username: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || '',
      entities: [__dirname + '/entities/*.entity.js'],
    });
  }

  async initialize() {
    await super.initialize();
    await syncDatabaseData();
    return this;
  }

  // async getAllClients(): Promise<Client[]> {
  //     return await this.createQueryBuilder()
  //         .select(['client.username', 'client.displayName', 'client.picture'])
  //         .from(Client, 'client')
  //         .leftJoinAndSelect('client.layouts', 'layout')
  //         .leftJoinAndSelect('layout.groups', 'group')
  //         .leftJoinAndSelect('group.parameterButtons', 'parameterButton')
  //         .getMany();
  // }

  // async getClientDto(username: string): Promise<Client | null> {
  //     return await this.createQueryBuilder<Client>(Client, 'client')
  //         .leftJoinAndSelect('client.layouts', 'layout')
  //         .leftJoinAndSelect('layout.groups', 'group')
  //         .leftJoinAndSelect('group.parameterButtons', 'parameterButton')
  //         .where('client.username = :username', { username: username })
  //         .getOne();
  // }

  // async getLayout(layoutId: string): Promise<Layout | null> {
  //   return await DATABASE.createQueryBuilder<Layout>(Layout, 'layout')
  //     .leftJoinAndSelect('layout.parameterBadges', 'parameterBadges')
  //     .leftJoinAndSelect('layout.presetButtons', 'presetButton')
  //     .leftJoinAndSelect('presetButton.image', 'presetButton_image')
  //     .leftJoinAndSelect('layout.groups', 'group')
  //     .leftJoinAndSelect('group.parameterButtons', 'parameterButton')
  //     .leftJoinAndSelect('parameterButton.image', 'parameterButton_image')
  //     .where('layout.id = :id', { id: layoutId })
  //     .orderBy('parameterBadges.order')
  //     .addOrderBy('presetButton.order')
  //     .addOrderBy('group.order')
  //     .addOrderBy('parameterButton.order')
  //     .getOne();
  // }
  //
  // async getGroup(groupId: string): Promise<Group | null> {
  //   return await DATABASE.createQueryBuilder<Group>(Group, 'group')
  //     .leftJoinAndSelect('group.parameterButtons', 'parameterButton')
  //     .leftJoinAndSelect('parameterButton.image', 'parameterButton_image')
  //     .where('group.id = :id', { id: groupId })
  //     .orderBy('parameterButton.order')
  //     .getOne();
  // }
  //
  // async getButton(buttonId: string): Promise<ParameterButton | null> {
  //   return await DATABASE.createQueryBuilder<ParameterButton>(ParameterButton, 'parameterButton')
  //     .leftJoinAndSelect('parameterButton.image', 'parameterButton_image')
  //     .where('parameterButton.id = :id', { id: buttonId })
  //     .getOne();
  // }
  //
  // async getPresetButton(presetButtonId: string): Promise<PresetButton | null> {
  //   return await DATABASE.createQueryBuilder<PresetButton>(PresetButton, 'presetButton')
  //     .leftJoinAndSelect('presetButton.image', 'presetButton_image')
  //     .where('presetButton.id = :id', { id: presetButtonId })
  //     .getOne();
  // }
  //
  // async getAvatarButton(avatarButtonId: string): Promise<AvatarButton | null> {
  //   return await DATABASE.createQueryBuilder<AvatarButton>(AvatarButton, 'avatarButton')
  //     .leftJoinAndSelect('avatarButton.image', 'avatarButton_image')
  //     .where('avatarButton.id = :id', { id: avatarButtonId })
  //     .getOne();
  // }
  //
  // async getUsedParameterButton(username: string, buttonId: string): Promise<ParameterButton | null> {
  //   return await this.createQueryBuilder<ParameterButton>(ParameterButton, 'parameterButton')
  //     .leftJoin('parameterButton.group', 'group')
  //     .leftJoin('group.layout', 'layout')
  //     .leftJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('parameterButton.Id = :buttonId', { buttonId: buttonId })
  //     .getOne();
  // }
  //
  // async getUsedPresetButton(username: string, presetButtonId: string): Promise<PresetButton | null> {
  //   return await this.createQueryBuilder<PresetButton>(PresetButton, 'presetButton')
  //     .leftJoin('presetButton.layout', 'layout')
  //     .leftJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('presetButton.Id = :presetButtonId', { presetButtonId: presetButtonId })
  //     .getOne();
  // }
  //
  // async getUsedAvatarButton(username: string, avatarButtonId: string): Promise<AvatarButton | null> {
  //   return await this.createQueryBuilder<AvatarButton>(AvatarButton, 'avatarButton')
  //     .leftJoin('avatarButton.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('avatarButton.Id = :avatarButtonId', { avatarButtonId: avatarButtonId })
  //     .getOne();
  // }
  //
  // async getUseCostPathFromParameterButton(parameterButtonId: string): Promise<string | null | undefined> {
  //   const layout = await this.createQueryBuilder<Layout>(Layout, 'layout')
  //     .leftJoin('layout.groups', 'group')
  //     .leftJoin('group.parameterButtons', 'parameterButton')
  //     .where('parameterButton.Id = :parameterButtonId', { parameterButtonId: parameterButtonId })
  //     .getOne();
  //   if (layout?.useCostEnabled) return layout?.useCostPath;
  // }
  //
  // async getUseCostPathFromPresetButton(presetButtonId: string): Promise<string | null | undefined> {
  //   const layout = await this.createQueryBuilder<Layout>(Layout, 'layout')
  //     .leftJoin('layout.presetButtons', 'presetButton')
  //     .where('presetButton.Id = :presetButtonId', { presetButtonId: presetButtonId })
  //     .getOne();
  //   if (layout?.useCostEnabled) return layout?.useCostPath;
  // }

  // async getClientId(username: string): Promise<string | never> {
  //     const client = await this
  //         .createQueryBuilder<Client>(Client, 'client')
  //         .select('client.id')
  //         .where('client.username = :username', { username: username })
  //         .getOne();
  //     if (!client) throw new Error('Client not found with username ' + username);
  //     return client.id;
  // }

  // async getClientTier(username: string) {
  //   const client = await this.createQueryBuilder<Client>(Client, 'client')
  //     .innerJoinAndSelect('client.tier', 'tier')
  //     .where('client.username = :username', { username: username })
  //     .getOne();
  //   if (!client?.tier) throw new Error(`Unable to get tier for client ${username}`);
  //   return client?.tier;
  // }

  // async getClientLayoutTheme(username: string) {
  //     const layoutTheme = await this
  //         .createQueryBuilder<Theme>(Theme, 'layoutTheme')
  //         .innerJoin('layoutTheme.clients', 'client')
  //         .where('client.username = :username', { username: username })
  //         .getOne();
  //     if (!layoutTheme) throw new Error('No layoutTheme data for client ' + username);
  //     return layoutTheme;
  // }

  // async getClientInteractionKeys(username: string) {
  //   const interactionKeys = await this.createQueryBuilder<InteractionKey>(InteractionKey, 'interactionKey')
  //     .innerJoin('interactionKey.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .getMany();
  //   if (!interactionKeys) throw new Error('No interactionKeys data for client ' + username);
  //   return interactionKeys;
  // }

  // async verifyInteractionKeyRelation(username: string, interactionKeyid: string) {
  //   const client = await this.createQueryBuilder<Client>(Client, 'client')
  //     .select('client.id')
  //     .innerJoin('client.interactionKeys', 'interactionKeys')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('interactionKeys.id = :id', { id: interactionKeyid })
  //     .getOne();
  //   if (!client) throw new Error(`Unable to verify interaction key relation for client ${username}, (interaction key id ${interactionKeyid})`);
  //   return client.id;
  // }

  // async verifyLayoutRelation(username: string, layoutId: string) {
  //   const client = await this.createQueryBuilder<Client>(Client, 'client')
  //     .select('client.id')
  //     .innerJoin('client.layouts', 'layout')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('layout.id = :id', { id: layoutId })
  //     .getOne();
  //   if (!client) throw new Error(`Unable to verify layout relation for client ${username}, (layout id ${layoutId})`);
  //   return client.id;
  // }

  // async authParameterBadgeRelation(username: string, id: string) {
  //     const client = await this
  //         .createQueryBuilder<Client>(Client, 'client')
  //         .select('client.id')
  //         .innerJoin('client.layouts', 'layout')
  //         .innerJoin('layout.parameterBadges', 'parameterBadge')
  //         .where('client.username = :username', { username: username })
  //         .andWhere('parameterBadge.id = :id', { id: id })
  //         .getOne();
  //     if (!client) throw new Error('Requested parameterBadge not found for user ' + username);
  //     return client.id;
  // }

  // async verifyGroupRelation(username: string, groupId: string) {
  //   const layout = await this.createQueryBuilder<Layout>(Layout, 'layout')
  //     .select('layout.id')
  //     .innerJoin('layout.client', 'client')
  //     .innerJoin('layout.groups', 'group')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('group.id = :id', { id: groupId })
  //     .getOne();
  //   if (!layout) throw new Error(`Unable to verify group relation for client ${username}, (group id ${groupId})`);
  //   return layout.id;
  // }
  //
  // async verifyParameterButtonRelation(username: string, parameterButtonId: string) {
  //   const group = await this.createQueryBuilder<Group>(Group, 'group')
  //     .select('group.id')
  //     .innerJoin('group.layout', 'layout')
  //     .innerJoin('layout.client', 'client')
  //     .innerJoin('group.parameterButtons', 'parameterButton')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('parameterButton.id = :id', { id: parameterButtonId })
  //     .getOne();
  //   if (!group) throw new Error(`Unable to verify parameter button relation for client ${username}, (parameter button id ${parameterButtonId})`);
  //   return group.id;
  // }
  //
  // async verifyPresetButtonRelation(username: string, presetButtonId: string) {
  //   const layout = await this.createQueryBuilder<Layout>(Layout, 'layout')
  //     .select('layout.id')
  //     .innerJoin('layout.presetButtons', 'presetButton')
  //     .innerJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('presetButton.id = :id', { id: presetButtonId })
  //     .getOne();
  //   if (!layout) throw new Error(`Unable to verify preset button relation for client ${username}, (preset button id ${presetButtonId})`);
  //   return layout.id;
  // }
  //
  // async verifyAvatarButtonRelation(username: string, avatarButtonId: string) {
  //   const client = await this.createQueryBuilder<Client>(Client, 'client')
  //     .select('client.id')
  //     .innerJoin('client.avatarButtons', 'avatarButton')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('avatarButton.id = :id', { id: avatarButtonId })
  //     .getOne();
  //   if (!client) throw new Error(`Unable to verify avatar button relation for client ${username}, (preset button id ${avatarButtonId})`);
  //   return client.id;
  // }

  // async authFileRelation(username: string, id: string) {
  //     const file = await this
  //         .createQueryBuilder<UploadedFile>(UploadedFile, 'file')
  //         .innerJoin('file.client', 'client')
  //         .where('client.username = :username', { username: username })
  //         .andWhere('file.id = :id', { id: id })
  //         .getOne();
  //     if (!file) throw new Error('Requested parameterButton not found for user ' + username);
  //     return file?.id;
  // }

  // async adminCheck(username: string) {
  //   const admin = await this.createQueryBuilder<Admins>(Admins, 'admins')
  //     .innerJoin('admins.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .getOne();
  //   return !!admin;
  // }
  //
  // async authenticateClient(username: string, password: string): Promise<Client | null> {
  //   const result = await Client.createQueryBuilder('client')
  //     .addSelect('client.password')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('client.password IS NOT NULL')
  //     .getOne();
  //   if (!!result && bcrypt.compareSync(password, result.password)) return result;
  //   return null;
  // }
  //
  // async canAddLayout(username: string): Promise<void> {
  //   const tier = await this.getClientTier(username);
  //   const layouts = await DATABASE.createQueryBuilder<Layout>(Layout, 'layout')
  //     .innerJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .getCount();
  //   if (layouts >= tier.layouts) throw new ApiError(`You can't add any more layouts! (Max ${tier.layouts})`);
  // }
  //
  // async canAddGroup(username: string, layoutId: string): Promise<void> {
  //   const tier = await this.getClientTier(username);
  //   const groups = await DATABASE.createQueryBuilder<Group>(Group, 'group')
  //     .innerJoin('group.layout', 'layout')
  //     .innerJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('layout.id = :id', { id: layoutId })
  //     .getCount();
  //   if (groups >= tier.groups) throw new ApiError(`You can't add any more groups! (Max ${tier.groups})`);
  // }
  //
  // async canAddParameterButton(username: string, groupId: string): Promise<void> {
  //   const tier = await this.getClientTier(username);
  //   const parameterButtons = await DATABASE.createQueryBuilder<ParameterButton>(ParameterButton, 'parameterButton')
  //     .innerJoin('parameterButton.group', 'group')
  //     .innerJoin('group.layout', 'layout')
  //     .innerJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('group.id = :id', { id: groupId })
  //     .getCount();
  //   if (parameterButtons >= tier.parameterButtons) throw new ApiError(`You can't add any more parameter buttons! (Max ${tier.parameterButtons})`);
  // }
  //
  // async canAddPresetButton(username: string, layoutId: string): Promise<void> {
  //   const tier = await this.getClientTier(username);
  //   const presetButtons = await DATABASE.createQueryBuilder<PresetButton>(PresetButton, 'presetButton')
  //     .innerJoin('presetButton.layout', 'layout')
  //     .innerJoin('layout.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .andWhere('layout.id = :id', { id: layoutId })
  //     .getCount();
  //   if (presetButtons >= tier.presetButtons) throw new ApiError(`You can't add any more preset buttons! (Max ${tier.presetButtons})`);
  // }
  //
  // async canAddAvatarButton(username: string): Promise<void> {
  //   const tier = await this.getClientTier(username);
  //   const avatarButtons = await DATABASE.createQueryBuilder<AvatarButton>(AvatarButton, 'avatarButton')
  //     .innerJoin('avatarButton.client', 'client')
  //     .where('client.username = :username', { username: username })
  //     .getCount();
  //   if (avatarButtons >= tier.avatarButtons) throw new ApiError(`You can't add any more avatar buttons! (Max ${tier.avatarButtons})`);
  // }
  //
  // // async canAddControlParameters(username: string, newCount: number): Promise<void> {
  // //     const result = await this.createQueryBuilder<Client>(Client, 'client')
  // //         .leftJoin('client.tier', 'tier')
  // //         .where('tier.controlParameters >= :newCount', { newCount: newCount })
  // //         .getOne();
  // //     if (!result) throw new Error(`Client ${username} can't add that many ${newCount} controlParameters`);
  // // }
  //
  // // async canAddParameterBadges(username: string, layoutId: string, newCount: number): Promise<void> {
  // //     const result = await this.createQueryBuilder<Client>(Client, 'client')
  // //         .leftJoin('client.tier', 'tier')
  // //         .where('tier.parameterBadges >= :newCount', { newCount: newCount })
  // //         .getOne();
  // //     if (!result) throw new Error(`Client ${username} can't add that many ${newCount} parameterBadges`);
  // // }
  //
  // async canAddInteractionKeys(username: string, newCount: number): Promise<void> {
  //   const result = await this.createQueryBuilder<Client>(Client, 'client')
  //     .leftJoin('client.tier', 'tier')
  //     .where('tier.interactionKeys >= :newCount', { newCount: newCount })
  //     .getOne();
  //   if (!result) throw new Error(`Client ${username} can't have that many interactionKeys (${newCount})`);
  // }
  //
  // async getDefaultTier() {
  //   const tier = await this.createQueryBuilder<Tier>(Tier, 'tier')
  //     .where('tier.rank = :rank', { rank: 1 })
  //     .getOne();
  //   if (!tier) throw new Error(`Can't tier with rank 1`);
  //   return tier;
  // }
  //
  // async getDefaultBackground(tier: Tier) {
  //   // get random background for tier rank or lower
  //   const backgrounds = await this.createQueryBuilder<Background>(Background, 'background')
  //     .leftJoin('background.tier', 'tier')
  //     .where('tier.rank <= :rank', { rank: tier.rank })
  //     .getMany();
  //   // workaround because .orderBy('RANDOM()') doesn't work in postgres :)
  //   const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  //   if (!background) throw new Error(`Can't find random background for tier ${tier.rank}`);
  //
  //   return background;
  // }
  //
  // async getDefaultTheme(tier: Tier) {
  //   // get random theme for tier rank or lower
  //   const themes = await this.createQueryBuilder<Theme>(Theme, 'theme')
  //     .leftJoin('theme.tier', 'tier')
  //     .where('tier.rank <= :rank', { rank: tier.rank })
  //     .getMany();
  //   // workaround because .orderBy('RANDOM()') doesn't work in postgres :)
  //   const theme = themes[Math.floor(Math.random() * themes.length)];
  //   if (!theme) throw new Error(`Can't find random theme for rank ${tier.rank}`);
  //
  //   return theme;
  // }
}
